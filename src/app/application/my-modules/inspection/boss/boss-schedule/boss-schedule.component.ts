import { IonicPage } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { NgValidatorExtendService } from './../../../../../core/services/ng-validator-extend.service';
import * as moment from 'moment'
import { BossService } from '../shared/service/boss.service';

@IonicPage()
@Component({
    selector: 'sg-boss-schedule',
    templateUrl: 'boss-schedule.component.html'
})

export class BossScheduleComponent implements OnInit {

    scheduleForm: FormGroup;

    name_id: number = 1;
    inspectPeriod: string = 'daily';
    from_time: string;
    to_time: string;
    mrinamelist: any[];
    locationlist: any[];

    selectMaxYear = +moment(new Date()).format('YYYY') + 1;
    // schedulelines:scheduleline[];
    constructor(
        private fb: FormBuilder,
        private validExd: NgValidatorExtendService,
        private bossService: BossService
    ) { }

    async  ngOnInit() {
        this.init();
        let res = await this.bossService.getMriName();
        this.mrinamelist = res.json();
        let res1 = await this.bossService.get7SLocation();
        this.locationlist = res1.json();
    }

    init() {
        this.scheduleForm = this.initForm(new schedule());
    }

    /**
    * 初始化基础FormGroup
    * 
    * @param {*} 需要绑定的数据 
    * @returns {FormGroup} 
    */
    initForm(work: any = {}): FormGroup {
        return this.fb.group({
            schedules: this.fb.array([
                this.initSubForm()
            ])
        });
    };

    initSubForm() {
        let sub: any;
        if (this.inspectPeriod === 'daily') {
            sub = this.fb.group({
                name_id: [this.name_id, Validators.required],
                from_time: [this.from_time, Validators.required],
                to_time: [this.to_time, Validators.required],
                scheduledate: [moment(new Date()).format('YYYY-MM-DD'), Validators.required],
                empnos: this.fb.array(this.get_empty_array(), this.checkEmpno)
            }, { validator: this.checkTime })
        }
        if (this.inspectPeriod === 'weekly') {
            sub = this.fb.group({
                name_id: [this.name_id, Validators.required],
                from_time: [this.from_time, Validators.required],
                to_time: [this.to_time, Validators.required],
                scheduledate: ['', Validators.required],
                area: ['', Validators.required],
                empnos: this.fb.array(this.get_empty_array(), this.checkEmpno)
            }, { validator: this.checkTime })
        }
        return sub;
    };


    changeType() {
        this.inspectPeriod = this.mrinamelist.filter((v: any) => (v.NAME_ID === this.name_id))[0].INSPECT_PERIOD;
        this.init();
    }

    changeStartTime() {
        this.schedulelines.controls.forEach((scheduleline: FormGroup) => {
            scheduleline.patchValue({
                from_time: this.from_time
            })
        })
    }

    changeEndTime() {
        this.schedulelines.controls.forEach((scheduleline: FormGroup) => {
            scheduleline.patchValue({
                to_time: this.to_time
            })
        })

    }

    showdetail() {
        console.log(this.scheduleForm);
        console.log(this.scheduleForm.valid)
    }

    checkEmpno(control: FormArray) {
        var valid = false;
        control.controls.forEach(control => {
            if (!valid) {
                if (control.value == '') {
                    valid = true;
                }
            }
        })
        if (!valid) {
            return null;
        } else {
            return { empnoIsNotNull: true };
        }
    }

    checkTime(control: FormGroup): any {
        var valid = false;
        let starttime = control.controls.from_time.value;
        let endtime = control.controls.to_time.value;
        if (starttime && endtime) {
            if (parseInt(endtime.substring(0, 2)) * 60 + parseInt(endtime.substring(3, 5)) <= parseInt(starttime.substring(0, 2)) * 60 + parseInt(starttime.substring(3, 5))) {
                return { timeerror: { desc: "結束時間不能小於開始時間！" } };
            } else {
                return null;
            }
        } else {
            return null;
        }
        // console.log(parseInt(endtime.substring(0,2))*60 +parseInt(endtime.substring(3,5)));
        // if (parseInt(endtime.substring(0,2))*60 +parseInt(endtime.substring(3,5))) {
        //     return null;
        // } else {
        //     return { timeerrpr: true };
        // }

    }


    addScheduleLine() {
        this.schedulelines.push(this.initSubForm());
    }

    removeScheduleLine(index: any) {
        let checkPersons = this.scheduleForm.get('schedules') as FormArray;
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
        return this.scheduleForm.get('schedules') as FormArray;
    };

    get_persons(schedulelineid: any): FormArray {
        return this.schedulelines.controls[schedulelineid].get('empnos') as FormArray;
    };

    get_empty_array() {
        let temp = [];
        if (this.inspectPeriod === 'daily') {
            return ['', ''];
        }
        if (this.inspectPeriod === 'weekly') {
            return ['', '', ''];
        }
    }
}

class schedule {
    schedules: scheduleLine[];
    constructor(
    ) {
    }
}

class scheduleLine {
    SCHEDULE_HEADER_ID: number;
    name_id: number;
    from_time: string;
    to_time: string;
    scheduledate: string = '';
    area: string = '';
    empnos: person[];
}

class person {
    empno: string = '';
}
