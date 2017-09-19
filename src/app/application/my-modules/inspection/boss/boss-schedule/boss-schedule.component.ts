import { IonicPage } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { NgValidatorExtendService } from './../../../../../core/services/ng-validator-extend.service';
import * as moment from 'moment'

@IonicPage()
@Component({
    selector: 'sg-boss-schedule',
    templateUrl: 'boss-schedule.component.html'
})

export class BossScheduleComponent implements OnInit {

    scheduleForm: FormGroup;

    name_id: number = 1;

    selectMaxYear = +moment(new Date()).format('YYYY') + 1;
    // schedulelines:scheduleline[];
    constructor(
        private fb: FormBuilder,
        private validExd: NgValidatorExtendService,
    ) { }

    ngOnInit() {
        this.init();
    }

    init() {
        this.scheduleForm = this.initForm(new schedule());
    }

    changeType() {
        this.init();
    }

    /**
    * 初始化基础FormGroup
    * 
    * @param {*} 需要绑定的数据 
    * @returns {FormGroup} 
    */
    initForm(work: any = {}): FormGroup {
        return this.fb.group({
            name_id: [this.name_id, Validators.required],
            from_time: [work.from_time, Validators.required],
            to_time: [work.to_time, Validators.required],
            schedulelines: this.fb.array([
                this.initSubForm()
            ])
        });
    };

    initSubForm() {
        let sub: any;
        if (this.name_id == 1 || this.name_id == 2) {
            sub = this.fb.group({
                scheduledate: [moment(new Date()).format('YYYY-MM-DD'), Validators.required],
                empnos: this.fb.array(this.get_empty_array(this.name_id), this.checkEmpno)
            })
        }
        if (this.name_id == 3) {
            sub = this.fb.group({
                scheduledate: ['', Validators.required],
                area: ['', Validators.required],
                empnos: this.fb.array(this.get_empty_array(this.name_id), this.checkEmpno)
            })
        }
        return sub;
    };

    showdetail() {
        console.log(this.scheduleForm.value);
        console.log(this.scheduleForm.valid)
    }

    checkEmpno(control: FormArray) {
        var valid = false;
        control.controls.forEach(control => {
            if (control.value) {
                valid = true;
            }
        })
        if (valid) {
            return null;
        } else {
            return { empnoIsNotNull: true };
        }
    }


    addScheduleLine() {
        this.schedulelines.push(this.initSubForm());
    }

    removeScheduleLine(index: any) {
        let checkPersons = this.scheduleForm.get('schedulelines') as FormArray;
        checkPersons.removeAt(index);
    }

    addPerson(schedulelineid: any) {
        let person = this.get_persons(schedulelineid);
        person.push(new FormControl(''));
    }

    removePerson(schedulelineid: any, personid: any) {
        let person = this.get_persons(schedulelineid);
        person.removeAt(personid);
    }

    get schedulelines(): FormArray {
        return this.scheduleForm.get('schedulelines') as FormArray;
    };

    get_persons(schedulelineid: any): FormArray {
        return this.schedulelines.controls[schedulelineid].get('empnos') as FormArray;
    };

    get_empty_array(type: number) {
        let temp = [];
        if (type == 1 || type == 2) {
            return ['', ''];
        }
        if (type == 3) {
            return ['', '', ''];
        }
    }
}

class schedule {
    name_id: number;
    from_time: string;
    to_time: string;
    schedulelines: scheduleLine[];
    constructor(
    ) {
    }
}

class scheduleLine {
    scheduledate: string = '';
    area: string = '';
    empnos: person[];
}

class person {
    empno: string = '';
}
