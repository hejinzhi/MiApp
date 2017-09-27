import { IonicPage, AlertController, NavParams } from 'ionic-angular';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

import { CacheService } from './../../../../../core/services/cache.service';
import { NgValidatorExtendService } from './../../../../../core/services/ng-validator-extend.service';
import { PluginService } from './../../../../../core/services/plugin.service';
import { BossService } from './../shared/service/boss.service';

import * as moment from 'moment'

@IonicPage()
@Component({
    selector: 'sg-boss-report',
    templateUrl: 'boss-report.component.html'
})

export class BossReportComponent implements OnInit {
    mark: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    totalMark: number = 0;
    admin: boolean;
    reportForm: FormGroup;
    className: string = this.constructor.name;
    type: string = 'all';
    schedule:any[];
    scheduleType:string;
    selectSchedule:any;

    testAdmin: any = {
        date: "2017-09-14",
        issueCount: "1项",
        lists: [
            {
                hasIssue: false,
                site: "dfgdfgfdg",
                time: "14:26",
            },
            {
                detail: "ghjhg",
                hasIssue: true,
                imgs: [],
                inCharge: "fghfgh",
                site: "fghfgh",
                time: "14:30"
            }
        ],
        people: "小明",
    }

    constructor(
        private navParams: NavParams,
        private fb: FormBuilder,
        private validExd: NgValidatorExtendService,
        private alertCtrl: AlertController,
        private cacheService: CacheService,
        private _ngZone: NgZone,
        private plugin: PluginService,
        private bossService: BossService
    ) { }

    ngOnInit() {
        // this.init();
        let schedule = this.navParams.get('schedule');
        this.admin = this.navParams.get('admin') || false;
        if(!this.admin && schedule) {
            this.bindInit(schedule)
        }
        if (this.admin) {
            this.init(this.testAdmin)
        } else {
            this.checkCache();
        }
    }

    changeSchedule() {
        this.searchNote();
    }

    /**
     * 绑定可选择检查项目的select元素的数据
     * 默认选择数组的第一个检查项目,然后去数据库查找是否已经有记录,有则更新表单
     * 
     * @param {*} data 
     */
    bindInit(data:any) {
        this.schedule = data;
        this.scheduleType = this.schedule[0].NAME_ID;
        this.searchNote();
    }

    /**
     * 去数据库查找是否已经有记录,有则更新表单
     * 
     */
    async searchNote() {
        this.selectSchedule = this.schedule.filter((i:any) => i.NAME_ID === this.scheduleType)[0];
        let id  = this.selectSchedule.REPORT_ID;
        let note;
        if(+id !== 0) {
            let loading = this.plugin.createLoading();
            loading.present();
            note = await this.bossService.getBossReport(id);
            loading.dismiss();
            this.init(note);
        }
    }

    /**
     * 清空缓存
     * 
     */
    clearCache() {
        this.cacheService.update(this.className, this.type + '', '');
    }

    /**
     * 检查是否又未提交或未提交成功的缓存
     * 询问并根据用户选择决定是否恢复数据
     */
    checkCache(): void {
        let data: any;
        if (data = this.cacheService.get(this.className, this.type + '')) {
            let confirm = this.alertCtrl.create({
                title: `帮助`,
                message: `发现之前有未提交的数据, 是否恢复?`,
                buttons: [
                    {
                        text: '取消',
                        handler: () => {
                            this.init();
                            this.clearCache();
                        }
                    },
                    {
                        text: '确定',
                        handler: () => {
                            this.init(data)
                        }
                    }
                ]
            });
            confirm.present();
            confirm.onDidDismiss(() => {
                if (!this.reportForm) {
                    this.init();
                }
            })
        } else {
            this.init();
        }
    }

    /**
     * 初始化表单
     * 
     * @param {*} [work={}] 
     */
    init(work: any = {}) {
        let date: string = moment(new Date()).format('YYYY-MM-DD');
        work = work.date ? work : new ReportHead(date, this.plugin.chineseConv(this.schedule.filter((i:any) => i.NAME_ID === this.scheduleType)[0].PERSON))
        this.reportForm = this.initForm(work);
        this.reportForm.valueChanges.subscribe((value) => {
            this.cacheService.update(this.className, this.type, value);
        })
        this.attchSubForm(work.lists);
        if (this.admin) {
            this.reportForm.disable({ onlySelf: false })
            let listsForm = this.reportForm.get('lists') as FormArray;
            Array.prototype.forEach.call(listsForm.controls, (i: FormGroup) => {
                i.addControl('mark', new FormControl('', this.validExd.required()))
                i.get('mark').valueChanges.subscribe(() => {
                    this.totalMark = 0
                    Array.prototype.forEach.call(listsForm.controls, (sub: FormGroup) => {
                        this.totalMark += +sub.get('mark').value;
                    })
                })
            })
        }
    }

    /**
     * 根据已有记录初始化次级表单
     * 
     * @param {any[]} lists 
     */
    attchSubForm(lists: any[]) {
        if (!lists || lists.length < 1) return;
        for (let i = 0; i < lists.length; i++) {
            let listsForm = this.reportForm.get('lists') as FormArray;
            let target = lists[i];
            if (target.hasIssue) {
                listsForm.push(this.addSub2Form(this.initSubForm(target, this.changeIssueCount), target))
            } else {
                listsForm.push(this.initSubForm(target, this.changeIssueCount));
            }
        }
    }

    /**
    * 初始化基础FormGroup
    * 
    * @param {*} 需要绑定的数据 
    * @returns {FormGroup} 
    */
    initForm(work: any = {}): FormGroup {
        return this.fb.group({
            date: [work.date],
            people: [work.people],
            issueCount: [work.issueCount],
            lists: this.fb.array([])
        });
    }

    /**
     * 初始化次级form
     * 
     * @param {*} [work={}]  输入的数据
     * @param {Function} [cb] hasIssue栏位更改时的钩子函数
     */
    initSubForm(work: any = {}, cb?: Function) {
        let sub = this.fb.group({
            time: [work.time || moment(new Date()).format('HH:mm'), this.validExd.required()],
            site: [work.site, this.validExd.required()],
            hasIssue: [work.hasIssue],
        })
        sub['displayNone'] = false;
        sub.controls['hasIssue'].valueChanges.subscribe((value) => {
            if (value) {
                this.addSub2Form(sub);
            } else {
                ['detail', 'imgs', 'inCharge'].forEach((val) => sub.removeControl(val));
            }
            cb.call(this, value);
        }
        )
        return sub
    }

    /**
     * 初始化二级form里的可选栏位
     * 
     * @param {FormGroup} sub 二级form
     * @param {{ detail: string, imgs: string[], inCharge: string }} [data] 绑定的数据
     */
    addSub2Form(sub: FormGroup, data?: { detail: string, imgs: string[], inCharge: string }) {
        data = data || { detail: '', imgs: [], inCharge: '' };
        sub.addControl('detail', new FormControl(data.detail, [this.validExd.required()]));
        sub.addControl('imgs', new FormControl(data.imgs));
        sub.addControl('inCharge', new FormControl(data.inCharge, [this.validExd.required()]));
        return sub;
    }

    /**
     * 更改出现的问题项
     * 
     * @param {boolean} add 是否添加问题项
     */
    changeIssueCount(add: boolean) {
        let target = this.reportForm.controls['issueCount'];
        let value: string = target.value;
        let count = value ? +value.substr(0, value.length - 1) : 0;
        count = add ? ++count : --count;
        this.reportForm.controls['issueCount'].setValue(count + '项')
    }

    addCheckSite() {
        let lists = this.reportForm.get('lists') as FormArray;
        lists.push(this.initSubForm({}, this.changeIssueCount));
        this.hideOldSub(lists.length);
        this.scrollToBottom();
    }

    /**
     * 隐藏当前二级form前面所有的二级form
     * 
     * @param {number} length 当前二级form的序位
     * @returns 
     */
    hideOldSub(length: number) {
        if (length < 2) return;
        for (let i = 0; i < length - 1; i++) {
            this.reportForm.get('lists').get(i + '')['displayNone'] = true
        }
    }

    /**
     * 隐藏所有的二级form
     * 
     */
    hideAll() {
        let listsForm = this.reportForm.get('lists') as FormArray;
        Array.prototype.forEach.call(listsForm.controls, (i: FormGroup) => {
            i['displayNone'] = true;
        })
    }

    /**
     * 滚动到最底
     * 
     */
    scrollToBottom() {
        this._ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                let div = document.querySelector('sg-boss-report .scroll-content');
                div.scrollTop = div.scrollHeight;
            }, 50)
        })
    }

    /**
     * 更改当前二级form的是否显示
     * 
     * @param {number} i 
     */
    toggle(i: number) {
        this.reportForm.get('lists').get(i + '')['displayNone'] = !this.reportForm.get('lists').get(i + '')['displayNone'];
    }

    /**
     * 移除当前二级form
     * 
     * @param {number} i 
     */
    removeSubFrom(i: number) {
        let confirm = this.alertCtrl.create({
            title: `提示`,
            message: `要删除第${i + 1}个检查地点吗?`,
            buttons: [
                {
                    text: '取消',
                    handler: () => {

                    }
                },
                {
                    text: '确定',
                    handler: () => {
                        let lists = this.reportForm.get('lists') as FormArray;
                        lists.removeAt(i);
                    }
                }
            ]
        });
        confirm.present();

    }

    /**
     * 提交
     * 
     */
    submit() {
        console.log(Object.assign(this.reportForm.value,this.selectSchedule));
        this.bossService.uploadReport(Object.assign(this.reportForm.value,this.selectSchedule)).then((res) => {
            console.log(res);
            console.log(res.json());
        })
        this.clearCache();
    }
}

class ReportHead {
    date: string;
    people: string;
    issue: string;
    constructor(
        date: string, people: string
    ) {
        this.date = date;
        this.people = people;
    }
}