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

    reportForm: FormGroup;

    selectMaxYear = +moment(new Date()).format('YYYY') + 1;

    name_id: number;
    start_date: string = moment(new Date()).format('YYYY-MM-DD');
    end_date: string = moment(new Date()).format('YYYY-MM-DD');

    selected_segment = 0;
    top_segment = 'top_0';
    segment = 'sites';

    rootNavCtrl: NavController;

    constructor(
        private fb: FormBuilder,
        private validExd: NgValidatorExtendService,
    ) {
    }

    ngOnInit() {

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