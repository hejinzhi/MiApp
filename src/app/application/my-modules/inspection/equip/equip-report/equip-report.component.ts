import { IonicPage, AlertController } from 'ionic-angular';
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

    testData = [
        {name:'是否在指定位置',code:'a'},
        {name:'是否有电',code:'b'},
        {name:'是否有水',code:'c'}
    ]
    constructor(
        private fb: FormBuilder,
        private validExd: NgValidatorExtendService,
        private alertCtrl: AlertController,
        private cacheService: CacheService,
    ) { }

    ngOnInit() { 
        this.checkCache();
    }

    /**
     * 检查是否又未提交或未提交成功的缓存
     * 询问并根据用户选择决定是否恢复数据
     */
    checkCache():void {
        let data:any;
        if(data = this.cacheService.get(this.className,this.type+'')) {
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
                if(!this.reportForm) {
                    this.init();
                }
            })
        } else {
            this.init();
        }
    }

    clearCache() {
        this.cacheService.update(this.className,this.type+'','');
    }

    init(work: any = {}) {
        this.reportForm = this.initForm(work);
        this.reportForm.valueChanges.subscribe((value) => {
            this.cacheService.update(this.className,this.type,value);
        })
    }

    /**
    * 初始化基础FormGroup
    * 
    * @param {*} 需要绑定的数据 
    * @returns {FormGroup} 
    */
    initForm(work: any = {}): FormGroup {
        let array = this.fb.array([]);
        this.testData.forEach((val,num) => {
            let check = work.lists && work.lists.length>0?work.lists[num].check:false;
            let group = this.fb.group({
                check: [check]
            })
            if(check && work.lists) {
                this.addErrorForm(group,work.lists[num]);
            }
            group.get('check').valueChanges.subscribe((val) => {
                if(val) {
                    this.addErrorForm(group);
                } else {
                    this.removeErrorForm(group);
                }
            })
            array.push(group)
        })
        return this.fb.group({
            time: [ work.time|| moment(new Date()).format('YYYY-MM-DD HH:mm') ],
            number: [work.number || 'XXXXX'],
            lists: array
        });
    }

    addErrorForm(group:FormGroup,data:any={}) {
        group.addControl('inCharge',new FormControl(data.inCharge,this.validExd.required()));
        group.addControl('imgs',new FormControl(data.imgs));
        group.addControl('detail',new FormControl(data.detail,this.validExd.required()));
    }

    removeErrorForm(group:FormGroup) {
        group.removeControl('inCharge');
        group.removeControl('imgs');
        group.removeControl('detail');
    }

    scan() {
        console.log('scanning');
        this.reportForm.get('number').setValue('scan后得到的编号')
    }

    submit() {
        console.log(this.reportForm.value);
        this.clearCache();
        
    }
}