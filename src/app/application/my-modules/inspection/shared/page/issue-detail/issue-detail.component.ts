import { Lines_Delete } from './../../actions/line.action';
import { Lines_All_Update } from "./../../actions/lineAll.action";
import { MyStore } from './../../../../../../shared/store';
import { Store } from '@ngrx/store';
import { PluginService } from './../../../../../../core/services/plugin.service';
import { BossReportLineState } from './../../../boss/shared/store';
import { BossService } from './../../../boss/shared/service/boss.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IonicPage, NavParams, AlertController, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import { NgValidatorExtendService } from './../../../../../../core/services/ng-validator-extend.service';

@IonicPage()
@Component({
    selector: 'sg-issue-detail',
    templateUrl: 'issue-detail.component.html'
})

export class IssueDetailComponent implements OnInit {
    type:number=0;
    issue:BossReportLineState;
    reportForm: FormGroup
    adminReport: FormGroup;
    admin:boolean;
    statusList = [
        {type:'New',value:'待分配'},
        {type:'Waiting',value:'待处理'},
        {type:'Done',value:'已处理'},
        {type:'Highlight',value:'Highlight'}
    ]
    constructor(
        private navParams: NavParams,
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        private fb: FormBuilder,
        private validExd: NgValidatorExtendService,
        private bossService: BossService,
        private plugin: PluginService,
        private $store: Store<MyStore>
    ) { }

    ngOnInit() {
        this.type = this.navParams.get('type') || 0;
        // this.type =0;
        this.issue = this.navParams.get('issue') || {};
        this.admin = this.navParams.get('admin') || false;
        this.reportForm = this.initForm(this.issue);
        this.adminReport = this.initAdminForm(this.issue);
    }

    pushBack() {
        let confirm = this.alertCtrl.create({
            title: `提示`,
            message: `确定此事项不是本人负责的吗?`,
            buttons: [
              {
                text: '取消',
                handler: () => {

                }
              },
              {
                text: '确定',
                handler: () => {
                    let loading = this.plugin.createLoading();
                    loading.present();
                    let send:BossReportLineState = {LINE_ID:this.issue.LINE_ID,OWNER_EMPNO:'',PROBLEM_STATUS:'New'};
                    this.bossService.updateReportLines(send,() => {
                        this.navCtrl.pop()
                        this.$store.dispatch(new Lines_Delete(send));
                    },() => loading && loading.dismiss());
                }
              }
            ]
          });
          confirm.present();
    }

    initAdminForm(work:any ={}) {
        return this.fb.group({
            OWNER_EMPNO: [work.OWNER_EMPNO, this.validExd.required()],
            PROBLEM_STATUS: [work.PROBLEM_STATUS, this.validExd.required()]
        })
    }

    initForm(work:any={}) {
        if(typeof work.ACTION_PICTURES === 'string') {
            work.ACTION_PICTURES =this.plugin.getPictureUrlArray(work.ACTION_PICTURES)
        }
        let group = this.fb.group({
            ACTION_DESC: [work.ACTION_DESC,this.validExd.required()],
            ACTION_STATUS: [work.ACTION_STATUS],
            ACTION_PICTURES:[work.ACTION_PICTURES],
            ACTION_DATE: [work.ACTION_DATE || moment(new Date()).format('YYYY-MM-DD')]
        })
        if (this.admin) {
            group.disable({onlySelf:true});
        }
        return group
    }

    // changeStatus() {
    //     if(this.status === this.oldStatus) return;
    //     let confirm = this.alertCtrl.create({
    //         title: `提示`,
    //         message: `确定要更改报告状态吗?`,
    //         buttons: [
    //           {
    //             text: '取消',
    //             handler: () => {
    //                 this.status = this.oldStatus;
    //             }
    //           },
    //           {
    //             text: '确定',
    //             handler: () => {
    //                 this.navCtrl.pop();
    //             }
    //           }
    //         ]
    //       });
    //       confirm.present();
    // }

    submit() {
        let send = Object.assign({},this.reportForm.value);
        send.PROBLEM_STATUS = 'Done';
        send.ACTION_PICTURES = send.ACTION_PICTURES?send.ACTION_PICTURES.map((i:string) => 
        i.replace('data:image/jpeg;base64,', '')).join():'';
        send.LINE_ID = this.issue.LINE_ID;
        let loading = this.plugin.createLoading();
        loading.present();
        this.bossService.updateReportLines(send,() => {
            this.$store.dispatch(new Lines_Delete(send));
            this.plugin.showToast('提交成功');
            this.navCtrl.pop();
        },() => loading && loading.dismiss())
    }

    update() {
        let send = Object.assign({}, this.adminReport.value);
        send.LINE_ID = this.issue.LINE_ID;
        send.OWNER_EMPNO = send.OWNER_EMPNO.split(',')[0];
        let loading = this.plugin.createLoading();
        loading.present();
        this.bossService.updateLinesByAdmin(send,() => {
            this.plugin.showToast('更新成功')
            setTimeout(() => this.navCtrl.pop(),300);
            this.$store.dispatch(new Lines_All_Update(send));
        },() => loading && loading.dismiss())
    }
}