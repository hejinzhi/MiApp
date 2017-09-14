import { IonicPage, AlertController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

import { CacheService } from './../../../../../core/services/cache.service';
import { NgValidatorExtendService } from './../../../../../core/services/ng-validator-extend.service';
import * as moment from 'moment'

@IonicPage()
@Component({
    selector: 'sg-boss-report',
    templateUrl: 'boss-report.component.html'
})

export class BossReportComponent implements OnInit {
    mark: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    totalMark:number = 0;
    admin: boolean;
    reportForm: FormGroup;
    className: string = this.constructor.name;
    type: string = 'all';

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
    ) { }

    ngOnInit() {
        // this.init();
        this.admin = this.navParams.get('admin') || false;
        if(this.admin) {
            this.init(this.testAdmin)
        } else {
            this.checkCache();
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

    init(work: any = {}) {
        let date: string = moment(new Date()).format('YYYY-MM-DD');
        work = work.date ? work : new ReportHead(date, '小明')
        this.reportForm = this.initForm(work);
        this.reportForm.valueChanges.subscribe((value) => {
            this.cacheService.update(this.className, this.type, value);
        })
        this.attchSubForm(work.lists);
        this.reportForm.disable({onlySelf:false})
        if(this.admin) {
            let listsForm = this.reportForm.get('lists') as FormArray;
            Array.prototype.forEach.call(listsForm.controls,(i:FormGroup) => {
                i.addControl('mark',new FormControl('',this.validExd.required()))
                i.get('mark').valueChanges.subscribe(() => {
                    this.totalMark = 0
                    Array.prototype.forEach.call(listsForm.controls,(sub:FormGroup) => {
                        this.totalMark += +sub.get('mark').value;
                    })
                })
            })
        }
    }

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

    addSub2Form(sub: FormGroup, data?: { detail: string, imgs: string[], inCharge: string }) {
        data = data || { detail: '', imgs: [], inCharge: '' };
        sub.addControl('detail', new FormControl(data.detail, [this.validExd.required()]));
        sub.addControl('imgs', new FormControl(data.imgs));
        sub.addControl('inCharge', new FormControl(data.inCharge, [this.validExd.required()]));
        return sub;
    }

    changeIssueCount(add: boolean) {
        let target = this.reportForm.controls['issueCount'];
        let value: string = target.value;
        let count = value ? +value.substr(0, value.length - 1) : 0;
        count = add ? ++count : --count;
        this.reportForm.controls['issueCount'].setValue(count + '项')
    }

    addIssueDetail() {

    }

    addCheckSite() {
        let lists = this.reportForm.get('lists') as FormArray;
        lists.push(this.initSubForm({}, this.changeIssueCount));
        this.hideOldSub(lists.length);
        this.scrollToBottom();
    }

    hideOldSub(length: number) {
        if (length < 2) return;
        for (let i = 0; i < length - 1; i++) {
            this.reportForm.get('lists').get(i + '')['displayNone'] = true
        }
    }

    hideAll() {
        let listsForm = this.reportForm.get('lists') as FormArray;
        Array.prototype.forEach.call(listsForm.controls,(i:FormGroup) => {
            i['displayNone'] = true;
        })
    }

    scrollToBottom() {
        setTimeout(() => {
            let div = document.querySelector('sg-boss-report .scroll-content');
            div.scrollTop = div.scrollHeight;
        }, 50)
    }

    toggle(i: number) {
        this.reportForm.get('lists').get(i + '')['displayNone'] = !this.reportForm.get('lists').get(i + '')['displayNone'];
    }

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

    submit() {
        console.log(this.reportForm.value);
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