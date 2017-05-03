import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidateService }   from '../../../../core/services/validate.service';

import { MyValidatorModel } from '../../../../shared/models/my-validator.model';

import { FormType } from '../shared/config/form-type';

import { AttendanceMonthComponent } from '../attendance-month/attendance-month.component';

import { AttendanceConfig } from '../shared/config/attendance.config';

@Component({
  selector: 'sg-detail-on-form',
  templateUrl: 'detail-on-form.component.html'
})
export class DetailOnFormComponent {
  betweenMes: {
    date: string
  }
  selectMaxYear = AttendanceConfig.SelectedMaxYear;
  type: string;
  todo: FormGroup;
  timeError:string ='';
  myValidators:{};
  MyValidatorControl: MyValidatorModel;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private validateService: ValidateService) { }

  ionViewDidLoad() {
    this.type = this.navParams.data.type;
    this.betweenMes = {
      date: ''
    }
    this.todo = this.initWork(this.betweenMes);
    this.MyValidatorControl = this.initValidator();
    this.myValidators = this.MyValidatorControl.validators;
    for (let prop in this.myValidators) {
      this.todo.controls[prop].valueChanges.subscribe((value: any) => this.check(value, prop));
    }
  }
  initValidator() {
    let newValidator = new MyValidatorModel([
      {name:'date',valiItems:[
        {valiName:'Required',errMessage:'必须选择时间',valiValue:true},
        {valiName:'BeforeMonth',errMessage:'不能选择本月以后的日期',valiValue:new Date().getMonth()},
      ]}
    ])
    return newValidator;
  }
  //初始化原始數據
  initWork(work: any): FormGroup {
    return this.formBuilder.group({
      date: [work.date, Validators.required],
    });
  }
  //單獨輸入塊驗證
  check(value: any, name: string): Promise<any> {
    this.myValidators[name].value = value;
    let compare = this.myValidators[name].compare ? this.myValidators[this.myValidators[name].compare] : ''
    return this.validateService.check(this.myValidators[name], this.myValidators).then((prams) => {
      this.myValidators[name].error = prams.mes;
      this.myValidators[name].pass = !prams.mes;
      if (name === 'startTime' || name === 'endTime') {
        this.timeError = prams.mes;
      }
      return Promise.resolve(this.myValidators);
    });
  }
  leaveForm() {
    let formType = new FormType()
    console.log(this.todo.value);
    this.navCtrl.push(AttendanceMonthComponent);
    return false;
  }
}
