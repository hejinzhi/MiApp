import { Query } from './../../shared/model/common';
import { BossService } from './../shared/service/boss.service';
import { IonicPage, Platform, NavController, NavParams, Slides } from 'ionic-angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

import { NgValidatorExtendService } from './../../../../../core/services/ng-validator-extend.service';
import * as moment from 'moment'

@IonicPage()
@Component({
    selector: 'sg-comment',
    templateUrl: 'comment.component.html'
})

export class CommentComponent implements OnInit {
    @ViewChild('mySlider') slider: Slides;

    selectMaxYear = +moment(new Date()).format('YYYY') + 1;

    name_id: number = 3;
    mri_type: string = 'boss';


    start_date: string;
    end_date: string;

    selected_segment = 0;
    top_segment = 'top_0';
    segment = 'sites';


    AllList: any;
    NoCommentList: any;
    CommentList: any;
    NoReportList: any;

    constructor(
        private navCtrl: NavController,
        private validExd: NgValidatorExtendService,
        private bossService: BossService,
    ) { }

    ngOnInit() {
        let date = new Date();
        let today = date.toISOString();
        let month = date.getMonth();
        let year = date.getFullYear();
        let startTime = '';
        if (month === 0) {
            startTime = year - 1 + '-' + '12' + '-' + '26';
        } else {
            let monthString = month < 10 ? '0' + month : month;
            startTime = year + '-' + monthString + '-' + '26';
        }
        today = today.substr(0, today.indexOf('T'));

        this.start_date = startTime;
        this.end_date = today;

        this.getBossDutyList();
    }

    goToCheckReport(scheduleHeaderId: any, allDone: any) {
        if (scheduleHeaderId == 0) return;
        this.navCtrl.push('BossReportComponent', { scheduleHeaderId: scheduleHeaderId, admin: true, allDone: allDone });
    }

    async getBossDutyList() {
        let res: any = await this.bossService.getScheduleInfo(this.name_id, this.start_date, this.end_date);
        if (!res) return;
        this.AllList = res.json();
        console.log(this.AllList);
        
        if (this.AllList) {
            //未交報告
            this.NoReportList = this.AllList.filter((v: any) => (v.HEADER_ID === '' || v.HEADER_ID == null || v.HEADER_ID == 0));

            //未評分
            this.NoCommentList = this.AllList.filter((v: any) => (v.HEADER_ID > 0 && (v.SCORE === '' || v.SCORE == null)));

            //已評分   
            this.CommentList = this.AllList.filter((v: any) => (+v.HEADER_ID > 0 && v.SCORE));

        }
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

    showdetail() {
        this.navCtrl.push('BossReportComponent', {
            admin: true
        })
    }

    changeQuery(query: Query) {
        this.name_id = query.nameID;
        this.start_date = query.dateFM;
        this.end_date = query.dateTO;
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