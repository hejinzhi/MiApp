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

    selected_segment = 0;
    top_segment = 'top_0';
    segment = 'sites';

    bossDutyList:any;

    rootNavCtrl: NavController;

    constructor(
        private fb: FormBuilder,
        private navCtrl: NavController,
        private validExd: NgValidatorExtendService,
        private bossService: BossService,
    ) {
    }

    ngOnInit() {

        this.allByGroup = this.selectItems(this.bossDutyList);
        console.log(this.allByGroup, 569);

    }

    goToCheckReport() {
        this.navCtrl.push('BossReportComponent');
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
        console.log(88);
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

    getBossDutyList() {
      let res:any= this.bossService.getScheduleInfo(this.name_id, this.start_date, this.end_date);
      if (!res) return;
      this.bossDutyList = res.json();
    }

    nameIdChange(id: any) {
        this.name_id = id;
    }

    stratDateChange(date: string) {
        this.start_date = date;
    }

    endDateChange(date: string) {
        this.end_date = date;
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

    // bossDutyList = [{ "SCHEDULE_HEADER_ID": 35, "SCHEDULE_DATE": '2017/09/30', "NAME": '梁銘輝', "ACUTAL_FROM_TIME": '07:58', "ACTUAL_TO_TIME": '17:33', "ACTUAL_HOURS": '7.88', "LINE_NUM": '1', "HEADER_ID": '104' },
    // { "SCHEDULE_HEADER_ID": 35, "SCHEDULE_DATE": '2017/09/30', "NAME": '何錦枝', "ACUTAL_FROM_TIME": '07:47', "ACTUAL_TO_TIME": '17:32', "ACTUAL_HOURS": '6.37', "LINE_NUM": '1', "HEADER_ID": '104' },
    // { "SCHEDULE_HEADER_ID": 36, "SCHEDULE_DATE": '2017/09/30', "NAME": '陳慶垣', "ACUTAL_FROM_TIME": '07:58', "ACTUAL_TO_TIME": '21:30', "ACTUAL_HOURS": '4', "LINE_NUM": '2', "HEADER_ID": '' },
    // { "SCHEDULE_HEADER_ID": 36, "SCHEDULE_DATE": '2017/09/30', "NAME": '鄧旭', "ACUTAL_FROM_TIME": '07:58', "ACTUAL_TO_TIME": '10:48', "ACTUAL_HOURS": '2.8', "LINE_NUM": '2', "HEADER_ID": '' }
    // ];

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