import { PluginService } from './../../../../../core/services/plugin.service';
import { EquipService } from './../shared/service/equip.service';
import { IonicPage, AlertController, NavParams, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

import * as moment from 'moment'

import { CacheService } from './../../../../../core/services/cache.service';
import { NgValidatorExtendService } from './../../../../../core/services/ng-validator-extend.service';

@IonicPage()
@Component({
    selector: 'sg-equip-report',
    templateUrl: 'equip-report.component.html'
})

export class EquipReportComponent implements OnInit {

    reportForm: FormGroup;
    className: string = this.constructor.name;
    type: string = 'all';
    machineId:string;
    checkLs: CheckLists
    testData = [
        { name: '是否在指定位置', code: 'a' },
        { name: '是否有电', code: 'b' },
        { name: '是否有水', code: 'c' }
    ]
    constructor(
        private fb: FormBuilder,
        private validExd: NgValidatorExtendService,
        private alertCtrl: AlertController,
        private cacheService: CacheService,
        private equipService: EquipService,
        private plugin: PluginService,
        private navCtr: NavController
    ) { }

    ngOnInit() {
        this.checkCache();
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
                            this.init({});
                            this.clearCache();
                        }
                    },
                    {
                        text: '确定',
                        handler: () => {
                            this.init(data, data.checkLists)
                        }
                    }
                ]
            });
            confirm.present();
            confirm.onDidDismiss(() => {
                if (!this.reportForm) {
                    this.init({});
                }
            })
        } else {
            this.init({});
        }
    }

    clearCache() {
        this.cacheService.update(this.className, this.type + '', '');
    }

    init(work: any = {}, checkLists?: CheckLists) {
        this.reportForm = this.initForm(work, checkLists);

        this.reportForm.valueChanges.subscribe((value) => {
            value.checkLists = this.checkLs
            this.cacheService.update(this.className, this.type, value);
        })
    }

    /**
    * 初始化基础FormGroup
    * 
    * @param {*} 需要绑定的数据 
    * @returns {FormGroup} 
    */
    initForm(work: any = {}, checkLists?: CheckLists): FormGroup {
        let array = this.fb.array([]);
        this.initLists(work,array,checkLists);
        return this.fb.group({
            INSPECT_DATE: [work.INSPECT_DATE || moment(new Date()).format('YYYY-MM-DD HH:mm')],
            MACHINE_NO: [work.MACHINE_NO || 'S 6 -- 1F -- 01(1)'],
            MACHINE_ID: [work.MACHINE_ID || ''],
            lists: array
        });
    }

    initLists(work: any, lists: FormArray, checkLists?: CheckLists) {
        if(checkLists) {
            checkLists.CHECK_LIST.forEach((val, num) => {
                let check = work.lists && work.lists.length > 0 ? work.lists[num].check : false;
                let group = this.fb.group({
                    check: [check],
                    CHECK_ID: [val.CHECK_ID],
                    CHECK_LIST_CN: [val.CN],
                    CHECK_LIST_EN: [val.EN]
                })
                if (check && work.lists) {
                    this.addErrorForm(group, work.lists[num]);
                }
                group.get('check').valueChanges.subscribe((val) => {
                    if (val) {
                        this.addErrorForm(group);
                    } else {
                        this.removeErrorForm(group);
                    }
                })
                lists.push(group)
            })
        } else {
            if(work.lists && work.lists.length > 0) {
                work.lists.forEach((el:any) => {
                    let check = el.check
                    let group = this.fb.group({
                        check: [el.check],
                        CHECK_ID: [el.CHECK_ID],
                        content: [el.CN]
                    })
                    if (check && work.lists) {
                        this.addErrorForm(group, el);
                    }
                    group.get('check').valueChanges.subscribe((val) => {
                        if (val) {
                            this.addErrorForm(group);
                        } else {
                            this.removeErrorForm(group);
                        }
                    })
                    lists.push(group)
                });
                
            }
        }
    }

    addErrorForm(group: FormGroup, data: any = {}) {
        group.addControl('OWNER_EMPNO', new FormControl(data.OWNER_EMPNO, this.validExd.required()));
        group.addControl('imgs', new FormControl(data.imgs || []));
        group.addControl('PROBLEM_DESC', new FormControl(data.PROBLEM_DESC, this.validExd.required()));
    }

    removeErrorForm(group: FormGroup) {
        group.removeControl('OWNER_EMPNO');
        group.removeControl('imgs');
        group.removeControl('PROBLEM_DESC');
    }

    updateImgs(imgs: string[], contr: FormControl) {
        contr.setValue(imgs);
    }

    scan() {
        console.log('scanning');
        this.reportForm.get('MACHINE_NO').setValue('scan后得到的编号')
    }

    checkID() {
        let id = this.reportForm.get('MACHINE_NO').value;
        if (!id) return;
        let loading = this.plugin.createLoading();
        loading.present();
        this.equipService.getMachineCheckList(id).subscribe((d) => {
            this.checkLs = d;
            let detail = {MACHINE_NO:id,MACHINE_ID:this.checkLs.MACHINE_ID};
            this.init(detail, d);
            loading && loading.dismiss()
        }, (err) => { this.plugin.errorDeal(err); loading && loading.dismiss()});
    }

    submit() {
        let send = this.reportForm.value;
        console.log(send);
        
        let loading = this.plugin.createLoading();
        loading.present();
        this.equipService.updateQquipReport(send).subscribe((d) => {
            this.plugin.showToast('提交成功');
            this.clearCache();
            this.navCtr.pop()
        },(err) => {this.plugin.errorDeal(err);console.log(err);loading.dismiss()},() => loading.dismiss());
    }
}

interface CheckLists {
    MACHINE_ID: string;
    MACHINE_NO: string;
    CHECK_LIST: { CHECK_ID: number, CN: string, EN: string }[];
}