import { Lines_Delete } from './../../actions/line.action';
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
    status:number=2;
    oldStatus:number = 2;

    admin:boolean;
    statusList = [
        {type:1,value:'待分配'},
        {type:2,value:'待处理'},
        {type:3,value:'已处理'},
        {type:4,value:'HighLight'}
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
        this.reportForm = this.initForm();
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
                    let send:BossReportLineState = {LINE_ID:this.issue.LINE_ID,OWNER_EMPNO:'-1',PROBLEM_STATUS:'New'};
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

    initForm(work:any={}) {
        let group = this.fb.group({
            ACTION_DESC: [work.action,this.validExd.required()],
            ACTION_STATUS: [work.improvement],
            ACTION_PICTURES:[work.imgs],
            ACTION_DATE: [work.import_date || moment(new Date()).format('YYYY-MM-DD')]
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
        send.ACTION_PICTURES = send.ACTION_PICTURES?send.ACTION_PICTURES.join():'';
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
        console.log(this.status);
    }
}