import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidateService }   from '../../../../core/services/validate.service';

import { MyValidatorModel } from '../../../../shared/models/my-validator.model';

import { FormType } from '../shared/config/form-type';

import { AttendanceDetailComponent } from '../attendance-detail/attendance-detail.component';
import { SwipeNoteComponent } from '../swipe-note/swipe-note.component';

import { AttendanceConfig } from '../shared/config/attendance.config';

@Component({
  selector: 'sg-detail-between-form',
  templateUrl: 'detail-between-form.component.html'
})
export class DetailBetweenFormComponent {
  betweenMes: {
    startTime: string,
    endTime: string,
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
      startTime: '',
      endTime: '',
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
      {name:'startTime',valiItems:[
        {valiName:'DateNotBigger',errMessage:'结束时间不得小于开始时间',valiValue:'endTime'}
      ]},
      {name:'endTime',valiItems:[
        {valiName:'DateNotSmaller',errMessage:'结束时间不得小于开始时间',valiValue:'startTime'}
      ]}
    ])
    return newValidator;
  }
  //初始化原始數據
  initWork(work: any): FormGroup {
    return this.formBuilder.group({
      startTime: [work.startTime, Validators.required],
      endTime: [work.endTime, Validators.required],
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
    if(this.type === formType.swipe_note.type) {
      this.navCtrl.push(SwipeNoteComponent)
    }
    if(this.type === formType.attendance_detail.type) {
      this.navCtrl.push(AttendanceDetailComponent)
    }
    return false;
  }
}
