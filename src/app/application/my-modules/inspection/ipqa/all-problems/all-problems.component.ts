import { EnvConfig } from './../../../../../shared/config/env.config';
import { InspectionService } from './../shared/service/inspection.service';
import { IonicPage, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@IonicPage()
@Component({
    selector: 'sg-all-problems',
    templateUrl: 'all-problems.component.html'
})
export class AllProblemsComponent implements OnInit {

    constructor(
        private navCtrl: NavController,
        private inspectionService: InspectionService
    ) { }

    // status: string[] = ['New', 'Waiting', 'Done', 'Close', 'Highlight'];
    status: string = 'New';
    listData: any[] = [];
    fromPage: string;

    async  ngOnInit() {
        this.listData = await this.getNewList();
        this.fromPage = 'teamLeader';
    }

    async changeTab() {
        this.refreshData();
    }

    ionViewWillEnter() {
        this.refreshData();
    }


    async refreshData() {
        if (this.status === 'New') {
            this.listData = await this.getNewList();
            this.fromPage = 'teamLeader';
        } else if (this.status === 'Waiting') {
            this.listData = await this.getWaitingList();
            this.fromPage = 'handler';
        } else if (this.status === 'Done') {
            this.listData = await this.getDoneList();
            this.fromPage = 'admin';
        }
        else {
            this.listData = [];
            this.fromPage = 'teamLeader';
        }
    }

    goToExceptionPage(data: any) {
        this.navCtrl.push('ExceptionDetailComponent', { fromPage: this.fromPage, formData: data });
    }

    async getNewList() {
        let res = await this.inspectionService.getExcReportData('New', '', 'IPQA', EnvConfig.companyID);
        return res.json();
    }

    async getWaitingList() {
        let res = await this.inspectionService.getExcReportData('Waiting', '', 'IPQA', EnvConfig.companyID);
        return res.json();
    }

    async getDoneList() {
        let res = await this.inspectionService.getExcReportData('Done', '', 'IPQA', EnvConfig.companyID);
        return res.json();
    }

    async getCloseList() {
        let res = await this.inspectionService.getExcReportData('Close', '', 'IPQA', EnvConfig.companyID);
        return res.json();
    }

}
