import { IonicPage } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

import { NgValidatorExtendService } from './../../../../../core/services/ng-validator-extend.service';
import * as moment from 'moment'

@IonicPage()
@Component({
    selector: 'sg-boss-report',
    templateUrl: 'boss-report.component.html'
})

export class BossReportComponent implements OnInit {

    reportForm: FormGroup;


    constructor(
        private fb: FormBuilder,
        private validExd:NgValidatorExtendService,
    ) { }

    ngOnInit() {
        this.init();
     }

    init() {
        let date:string = moment(new Date()).format('YYYY-MM-DD');
        this.reportForm = this.initForm(new ReportHead(date,'小明'));
        console.log(this.reportForm);
        
    }

     /**
     * 初始化基础FormGroup
     * 
     * @param {*} 需要绑定的数据 
     * @returns {FormGroup} 
     */
    initForm(work: any = {}): FormGroup {
        return this.fb.group({
            date: [{value: work.date, disabled: true}],
            people: [{value: work.people, disabled: true}],
            issue: [{value: work.issue, disabled: true}],
            lists: this.fb.array([])
        });
    }
}

class ReportHead {
    date:string;
    people: string;
    issue: string;
    constructor(
        date:string,people:string
    ){
        this.date = date;
        this.people = people;
    }
}