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

    name_id: number = 2;
    start_date: string = moment(new Date()).format('YYYY-MM-DD');
    end_date: string = moment(new Date()).format('YYYY-MM-DD');

    selected_segment = 0;
    top_segment = 'top_0';
    segment = 'sites';

    constructor(
        private navCtrl: NavController,
        private validExd: NgValidatorExtendService,
    ) { }

    ngOnInit() {
    }

    goToCheckReport(){
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

    onSlideChanged($event: any) {
        if (((($event.touches.startX - $event.touches.currentX) <= 100) || (($event.touches.startX - $event.touches.currentX) > 0)) && (this.slider.isBeginning() || this.slider.isEnd())) {
            console.log("interdit Direction");
        }
        else {
            console.log("OK Direction");
        }

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
        console.log(this.name_id);
        console.log(this.start_date);
        console.log(this.end_date);
        this.navCtrl.push('BossReportComponent',{
            admin:true
        })
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