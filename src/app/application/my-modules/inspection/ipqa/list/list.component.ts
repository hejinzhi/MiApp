import { CommonService } from './../../../../../core/services/common.service';

import { EnvConfig } from './../../../../../shared/config/env.config';
import { InspectionService } from './../shared/service/inspection.service';
import { IpqaModel } from './../shared/model/ipqa';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@IonicPage()
@Component({
    selector: 'sg-list',
    templateUrl: 'list.component.html'
})
export class ListComponent implements OnInit {
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private commonService: CommonService,
        private inspectionService: InspectionService
    ) { }

    fromPage: string; //记录从哪个页面进来 
    formData: IpqaModel[];
    title: string;
    roleName: string;


    async ngOnInit() {
        this.title = this.navParams.get('title');
        this.fromPage = this.navParams.get('fromPage');
        this.roleName = this.navParams.get('roleName');

    }

    ionViewWillEnter() {
        this.commonService.showLoading();
        this.refreshData();
        this.commonService.hideLoading();
    }

    async refreshData() {
        this.formData = [];

        if (this.fromPage === 'teamLeader') {
            let res = await this.inspectionService.getExcReportData('New', '', 'IPQA', EnvConfig.companyID);
            this.formData = res.json();
        }
        else if (this.fromPage === 'handler') {
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            let res;
            if (this.roleName === 'INSPECT_IPQA_ADMIN') {
                res = await this.inspectionService.getExcReportData('Waiting', '', 'IPQA', EnvConfig.companyID);
            } else {
                res = await this.inspectionService.getExcReportData('Waiting', currentUser.empno, 'IPQA', EnvConfig.companyID);
            }
            this.formData = res.json();
        }
    }

    goToExceptionPage(formData: IpqaModel) {
        if (this.fromPage === 'teamLeader') {
            this.navCtrl.push('ExceptionDetailComponent', { fromPage: this.fromPage, formData: formData });
        }
        else if (this.fromPage === 'handler') {
            this.navCtrl.push('ExceptionDetailComponent', { fromPage: this.fromPage, formData: formData });
        }
    }
}