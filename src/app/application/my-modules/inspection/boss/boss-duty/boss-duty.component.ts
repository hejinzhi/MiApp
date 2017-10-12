import { Query } from './../../shared/model/common';
import { async } from '@angular/core/testing';
import { BossService } from './../shared/service/boss.service';
import { IonicPage, Platform, NavController, NavParams, Slides } from 'ionic-angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

import { NgValidatorExtendService } from './../../../../../core/services/ng-validator-extend.service';
import * as moment from 'moment'


@IonicPage()
@Component({
    selector: 'sg-boss-duty',
    templateUrl: 'boss-duty.component.html'
})

export class BossDutyComponent implements OnInit {
    @ViewChild('mySlider') slider: Slides;

    name_id: number = 3;
    mri_type: string = 'boss';
    start_date: string = moment(new Date()).format('YYYY-MM-DD');
    end_date: string = moment(new Date()).format('YYYY-MM-DD');

    selectMaxYear = +moment(new Date()).format('YYYY') + 1;
    allByGroup: any[][] = [];
    noCardByGroup: any[][] = [];
    noRepayByGroup: any[][] = [];
    RepayByGroup: any[][] = [];

    selected_segment = 0;
    top_segment = 'top_0';
    segment = 'sites';

    bossDutyList: any;
    noCardList: any;
    noRepayList: any;
    RepayList: any;

    rootNavCtrl: NavController;

    constructor(
        private fb: FormBuilder,
        private navCtrl: NavController,
        private validExd: NgValidatorExtendService,
        private bossService: BossService,
    ) {
    }

    ngOnInit() {

    }

    async  ionViewWillEnter() {
        await this.getBossDutyList();
    }

    goToCheckReport(scheduleHeaderId: any) {
        if(scheduleHeaderId == 0) return;
        this.navCtrl.push('BossReportComponent', { scheduleHeaderId: scheduleHeaderId,hr: true });
    }

    select(index: any) {
        if (index === 2) {
            this.top_segment = 'top_2';
        }
        if (index === 1) {
            this.top_segment = 'top_1';
        }
        if (index === 0) {
            this.top_segment = 'top_0';
        }
        this.slider.slideTo(index, 500);
    }

    select_segment(index: any) {
        this.selected_segment = index;
    }

    panEvent(e: any) {
        setTimeout(() => {
            let currentIndex = this.slider.getActiveIndex();
            if (currentIndex === 3) {
                this.top_segment = 'top_3';
            }
            if (currentIndex === 2) {
                this.top_segment = 'top_2';
            }
            if (currentIndex === 1) {
                this.top_segment = 'top_1';
            }
            if (currentIndex === 0) {
                this.top_segment = 'top_0';
            }
        }, 0)
    }

    async getBossDutyList() {
        let res: any = await this.bossService.getScheduleInfo(this.name_id, this.start_date, this.end_date);
        if (!res) return;
        this.bossDutyList = res.json();

        if (this.bossDutyList) {
            //未刷卡
            this.noCardList = this.bossDutyList.filter((v: any) => (v.ACUTAL_FROM_TIME === '' || v.ACTUAL_TO_TIME === '' || v.ACUTAL_FROM_TIME == null || v.ACTUAL_TO_TIME == null));
            if (this.noCardList) {
                this.noCardByGroup = this.selectItems(this.noCardList);
            }

            //未产生补休
            this.noRepayList = this.bossDutyList.filter((v: any) => (v.ACTUAL_HOURS === ''));
            if (this.noRepayList) {
                this.noRepayByGroup = this.selectItems(this.noRepayList);
            }

            //已产生补休   
            this.RepayList = this.bossDutyList.filter((v: any) => (v.ACTUAL_HOURS !== ''));
            if (this.RepayList) {
                this.RepayByGroup = this.selectItems(this.RepayList);
            }

            this.allByGroup = this.selectItems(this.bossDutyList);
            console.log(this.allByGroup, 123);
        }
    }

    changeQuery(query:Query) {
        this.name_id = query.nameID;
        this.start_date = query.dateFM;
        this.end_date = query.dateTO;
    }

    // 作用：用于把一维数组的数据按group分成二维数组存储
    selectItems(data: any[]): any[][] {
        let temp: any[][] = [];
        let groupTypes: string[] = [];
        for (let i = 0; i < data.length; i++) {
            if ((groupTypes.indexOf(data[i].SCHEDULE_HEADER_ID) === -1)) {
                groupTypes.push(data[i].SCHEDULE_HEADER_ID);
            }
        }

        // 数组初始化
        for (let i = 0; i < groupTypes.length; i++) {
            temp[i] = [];
        }

        for (let i = 0; i < groupTypes.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (data[j].SCHEDULE_HEADER_ID === groupTypes[i]) {
                    temp[i].push(data[j]);
                }
            }
        }

        return temp;
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