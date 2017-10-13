import { TranslateService } from '@ngx-translate/core';
import { Lines_Equip_Delete } from './../../actions/lines-equip.action';
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
    type: number = 0;
    issue: BossReportLineState;
    reportForm: FormGroup
    adminReport: FormGroup;
    admin: boolean;
    empRequired: boolean;
    translateTexts: any = {};
    statusList: any[];
    constructor(
        private navParams: NavParams,
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        private fb: FormBuilder,
        private validExd: NgValidatorExtendService,
        private bossService: BossService,
        private plugin: PluginService,
        private $store: Store<MyStore>,
        private translate: TranslateService
    ) { }

    ngOnInit() {
        this.subscribeTranslateText();
        this.type = this.navParams.get('type') || 0;
        // this.type =0;
        this.issue = this.navParams.get('issue') || {};
        this.admin = this.navParams.get('admin') || false;
        this.reportForm = this.initForm(this.issue);
        if (this.admin) {
            this.adminReport = this.initAdminForm(this.issue);
            this.adminReport.get('PROBLEM_STATUS').valueChanges.subscribe((val) => {
                if (val === 'New') {
                    this.empRequired = false;
                    setTimeout(() => this.adminReport.get('OWNER_EMPNO').setValue(''), 10);
                } else {
                    this.empRequired = true;
                }
            })
        }
    }

    subscribeTranslateText() {
        this.translate.get(['cancel',
            'confirm', 'inspection.confirmChangeOwner', 'inspection.bossCom.tip', 'submit_success',
            'inspection.statusNew', 'inspection.statusWaiting', 'inspection.statusDone' 
        ]).subscribe((res) => {
            this.translateTexts = res;
            this.statusList = [
                { type: 'New', value: this.translateTexts['inspection.statusNew'] },
                { type: 'Waiting', value: this.translateTexts['inspection.statusWaiting'] },
                { type: 'Done', value: this.translateTexts['inspection.statusDone'] },
                { type: 'Highlight', value: 'Highlight' }
            ]
        })
    }

    pushBack() {
        let confirm = this.alertCtrl.create({
            title: this.translateTexts['inspection.bossCom.tip'],
            message: this.translateTexts['inspection.confirmChangeOwner'],
            buttons: [
                {
                    text: this.translateTexts['cancel'],
                    handler: () => {

                    }
                },
                {
                    text: this.translateTexts['confirm'],
                    handler: () => {
                        let loading = this.plugin.createLoading();
                        loading.present();
                        let send: BossReportLineState = { LINE_ID: this.issue.LINE_ID, OWNER_EMPNO: '', PROBLEM_STATUS: 'New' };
                        this.bossService.updateReportLines(send, () => {
                            this.navCtrl.pop()
                            this.$store.dispatch(new Lines_Delete(send));
                        }, () => loading && loading.dismiss());
                    }
                }
            ]
        });
        confirm.present();
    }

    initAdminForm(work: any = {}) {
        this.empRequired = !(work.PROBLEM_STATUS === 'New');
        return this.fb.group({
            OWNER_EMPNO: [work.OWNER_EMPNO, this.validExd.required()],
            PROBLEM_STATUS: [work.PROBLEM_STATUS, this.validExd.required()]
        })
    }

    initForm(work: any = {}) {
        if (typeof work.ACTION_PICTURES === 'string') {
            work.ACTION_PICTURES = this.plugin.getPictureUrlArray(work.ACTION_PICTURES)
        }
        let group = this.fb.group({
            ACTION_DESC: [work.ACTION_DESC, this.validExd.required()],
            ACTION_STATUS: [work.ACTION_STATUS],
            ACTION_PICTURES: [work.ACTION_PICTURES],
            ACTION_DATE: [work.ACTION_DATE || moment(new Date()).format('YYYY-MM-DD')]
        })
        if (this.admin) {
            group.disable({ onlySelf: true });
        }
        return group
    }

    submit() {
        let send = Object.assign({}, this.reportForm.value);
        send.PROBLEM_STATUS = 'Done';
        send.ACTION_PICTURES = send.ACTION_PICTURES ? send.ACTION_PICTURES.map((i: string) =>
            i.replace('data:image/jpeg;base64,', '')).join() : '';
        send.LINE_ID = this.issue.LINE_ID;
        let loading = this.plugin.createLoading();
        loading.present();
        this.bossService.updateReportLines(send, () => {
            switch (+this.type) {
                case 1:
                    this.$store.dispatch(new Lines_Delete(send));
                    break;
                case 2:
                    this.$store.dispatch(new Lines_Equip_Delete(send));
                    break;
            }
            this.plugin.showToast(this.translateTexts['submit_success']);
            this.navCtrl.pop();
        }, () => loading && loading.dismiss())
    }

    update() {
        let send = Object.assign({}, this.adminReport.value);
        send.LINE_ID = this.issue.LINE_ID;
        send.OWNER_EMPNO = send.OWNER_EMPNO.split(',')[0];
        let loading = this.plugin.createLoading();
        loading.present();
        this.bossService.updateLinesByAdmin(send, () => {
            this.plugin.showToast(this.translateTexts['submit_success'])
            setTimeout(() => this.navCtrl.pop(), 300);
            this.$store.dispatch(new Lines_All_Update(send));
        }, () => loading && loading.dismiss())
    }
}