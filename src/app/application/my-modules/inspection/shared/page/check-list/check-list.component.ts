import { IonicPage, AlertController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { NgValidatorExtendService } from './../../../../../../core/services/ng-validator-extend.service';
import { CacheService } from './../../../../../../core/services/cache.service';

@IonicPage()
@Component({
    selector: 'sg-check-list',
    templateUrl: 'check-list.component.html'
})

export class CheckListComponent implements OnInit {
    checkForm: FormGroup;
    showLists:boolean;

    className: string = this.constructor.name;
    tempData: any;
    type: number;
    constructor(
        private fb: FormBuilder,
        private validExd:NgValidatorExtendService,
        private alertCtrl: AlertController,
        private cacheService: CacheService,
        public navParams: NavParams,
    ) { }

    ngOnInit() {
        this.type = this.navParams.get('type') || 1;
        // 类别为3是消防器材的检查,已固定检查指标,就不显示次级form了
        this.showLists = this.type !==3 ? true: false;
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
                if(!this.checkForm) {
                    this.init();
                }
            })
        } else {
            this.init();
        }
    }

    /**
     * 初始化this.checkForm,并监控保存实时数据到内存
     * @param {*} 需要绑定的数据 
     */
    init(data:any ={}) {
        this.checkForm = this.initForm(data);
        if(this.showLists) {
            this.checkForm.addControl('lists',this.fb.array([]));
            if(data && data.lists && data.lists.length>0) {
                for(let i =0;i<data.lists.length;i++) {
                    this.addSubFrom(data.lists[i]);
                }
            }
        }
        this.checkForm.valueChanges.subscribe((value) => {
            this.cacheService.update(this.className,this.type+'',value);
        })
    }

    /**
     * 初始化基础FormGroup
     * 
     * @param {*} 需要绑定的数据 
     * @returns {FormGroup} 
     */
    initForm(work: any = {}): FormGroup {
        return this.fb.group({
            name: [work.name, this.validExd.required()],
            more: [work.more],
            admin: [work.admin, this.validExd.required()],
            period: [work.period, this.validExd.required()],
            category: [work.category, this.validExd.required()]
        });
    }



    /**
     * 初始化下级FormGroup
     * 
     * @param {{list:string,type:string}} 需要绑定的数据 
     * @returns {FormGroup} 
     */
    initSubForm(sub:{list:string,type:string}={list:'',type:''}): FormGroup {
        return this.fb.group({
            list: [sub.list, this.validExd.required()],
            type: [sub.type, this.validExd.required()]
        })
    }

    /**
     * 对次级FormGroup的移除
     * 
     * @param {number} 在队列中的顺序 
     */
    removeSubFrom(i:number):void {
        let confirm = this.alertCtrl.create({
            title: `提示`,
            message: `要删除第${i+1}个检查指标吗?`,
            buttons: [
              {
                text: '取消',
                handler: () => {
      
                }
              },
              {
                text: '确定',
                handler: () => {
                    let lists = this.checkForm.controls['lists'] as FormArray;
                    lists.removeAt(i);
                }
              }
            ]
          });
          confirm.present();
    }

    /**
     * 增加一个新的次级FormGroup
     * 
     * @param {{list:string,type:string}}  需要绑定的数据
     */
    addSubFrom(sub:{list:string,type:string}={list:'',type:''}) {
        let lists = this.checkForm.controls['lists'] as FormArray;
        lists.push(this.initSubForm(sub))
    }

    /**
     * 清空缓存
     * 
     */
    clearCache() {
        this.cacheService.update(this.className,this.type+'','');
    }
    /**
     * 提交表单
     * 
     */
    submit() {
        console.log(this.checkForm.value);
        this.clearCache();
    }
}
