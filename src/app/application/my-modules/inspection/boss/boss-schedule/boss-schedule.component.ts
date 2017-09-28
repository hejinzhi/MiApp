import { async } from '@angular/core/testing';
import { PluginService } from './../../../../../core/services/plugin.service';
import { IonicPage } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { NgValidatorExtendService } from './../../../../../core/services/ng-validator-extend.service';
import * as moment from 'moment'
import { BossService } from '../shared/service/boss.service';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
    selector: 'sg-boss-schedule',
    templateUrl: 'boss-schedule.component.html'
})

export class BossScheduleComponent implements OnInit {
    translateTexts: any;

    scheduleForm: FormGroup;

    name_id: number = 1;
    inspectPeriod: string = 'daily';
    from_time: string;
    to_time: string;
    mrinamelist: any[];
    locationlist: any[];
    weeklist: any[];

    selectMaxYear = +moment(new Date()).format('YYYY') + 1;
    // schedulelines:scheduleline[];
    constructor(
        private fb: FormBuilder,
        private validExd: NgValidatorExtendService,
        private bossService: BossService,
        private plugin: PluginService,
        private translate: TranslateService,
    ) { }

    async  ngOnInit() {
        this.init();
        let res = await this.bossService.getMriName();
        this.mrinamelist = res.json();
        let res1 = await this.bossService.get7SLocation();
        this.locationlist = res1.json();
        let res2 = await this.bossService.getMriWeek(1, 8);
        this.weeklist = res2.json();

        this.translate.stream(['submit_success']).subscribe((res) => {
            this.translateTexts = res;
        })
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
                from_time: [this.from_time, Validators.required],
                to_time: [this.to_time, Validators.required],
                scheduledate: [moment(new Date()).format('YYYY-MM-DD'), Validators.required],
                empnos: this.fb.array(this.get_empty_array(), this.checkEmpno)
            }, { validator: this.checkTime })
        }
        if (this.inspectPeriod === 'weekly') {
            sub = this.fb.group({
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
        console.log(this.scheduleForm.value);
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

    async submit() {
        console.log(this.scheduleForm.value.schedules);

        let send_header = {
            schedule_header_id: '',
            company_name: '',
            name_id: this.name_id,
            schedule_name: '',
            schedule_date: '',
            week: '',
            from_date: '',
            to_date: '',
            from_time: '',
            to_time: '',
            enabled_flag: '',
        };

        let send_line = {
            schedule_header_id: '',
            schedule_line_id: '',
            empno: '',
            area: ''
        };

        let send_line_group: any[] = [];
        let schedules: any[] = [];

        send_header.schedule_header_id = '0';
        send_header.company_name = localStorage.getItem('appCompanyId');
        send_header.name_id = this.name_id;
        if (this.inspectPeriod === 'weekly') {

            send_header.week = this.scheduleForm.value.schedules[0].scheduledate.substring(4, 6);
            send_header.from_date = this.weeklist.filter((v: any) => (v.WEEK_ID === this.scheduleForm.value.schedules[0].scheduledate))[0].WEEK_START_DAY;
            send_header.to_date = this.weeklist.filter((v: any) => (v.WEEK_ID === this.scheduleForm.value.schedules[0].scheduledate))[0].WEEK_END_DAY;
            send_header.schedule_name = this.weeklist.filter((v: any) => (v.WEEK_ID === this.scheduleForm.value.schedules[0].scheduledate))[0].WEEK_DESC;;
            send_header.schedule_date = '';
        }
        if (this.inspectPeriod === 'daily') {
            send_header.schedule_date = this.scheduleForm.value.schedules[0].scheduledate;
            send_header.from_date = this.scheduleForm.value.schedules[0].scheduledate;
            send_header.to_date = this.scheduleForm.value.schedules[0].scheduledate;
            send_header.week = '';
        }
        send_header.from_time = this.from_time;
        send_header.to_time = this.to_time;
        send_header.enabled_flag = "Y"

        for (let i = 0; i <= this.scheduleForm.value.schedules.length - 1; i++) {
            for (let j = 0; j <= this.scheduleForm.value.schedules[i].empnos.length - 1; j++) {
                send_line.schedule_header_id = '0';
                send_line.schedule_line_id = '0';
                send_line.empno = this.scheduleForm.value.schedules[i].empnos[j].split(',')[0];
                send_line.area = this.scheduleForm.value.schedules[i].area ? this.scheduleForm.value.schedules[i].area : '';
                send_line_group.push({
                    "SCHEDULE_HEADER_ID": send_line.schedule_header_id,
                    "SCHEDULE_LINE_ID": send_line.schedule_line_id,
                    "LINE_NUM": j + 1,
                    "EMPNO": send_line.empno,
                    "AREA": send_line.area
                });
            }
            schedules.push({
                "Header": {
                    "SCHEDULE_HEADER_ID": send_header.schedule_header_id,
                    "COMPANY_NAME": send_header.company_name,
                    "NAME_ID": send_header.name_id,
                    "SCHEDULE_NAME": send_header.schedule_name,
                    "SCHEDULE_DATE": send_header.schedule_date,
                    "WEEK": send_header.week,
                    "FROM_DATE": send_header.from_date,
                    "TO_DATE": send_header.to_date,
                    "FROM_TIME": send_header.from_time,
                    "TO_TIME": send_header.to_time,
                    "ENABLED": send_header.enabled_flag,
                },
                "Lines": send_line_group
            });
            send_line_group = [];
        }

        let schedules_data = {
            "Schedules": schedules
        };

        console.log(JSON.stringify(schedules_data));

        let loading = this.plugin.createLoading();
        loading.present();
        let res: any = await this.bossService.saveSchedule(schedules_data);
        loading.dismiss();
        console.log(res, 422);

        if (!res.status) {
            // this.errTip = res.content;
        } else {
            this.plugin.showToast(this.translateTexts['submit_success']);
        };
    }
}

class schedule {
    schedules: scheduleLine[];
    constructor(
    ) {
    }
}

class scheduleLine {
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
