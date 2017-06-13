import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidateService }   from '../../../../core/services/validate.service';
import { PluginService }   from '../../../../core/services/plugin.service';
import { AttendanceService } from '../shared/service/attendance.service';

import { MyValidatorModel } from '../../../../shared/models/my-validator.model';

import { FormType } from '../shared/config/form-type';

import { AttendanceMonthComponent } from '../attendance-month/attendance-month.component';

import { AttendanceConfig } from '../shared/config/attendance.config';
import { LanguageTypeConfig } from '../shared/config/language-type.config';

// @IonicPage()
@Component({
  selector: 'sg-detail-on-form',
  templateUrl: 'detail-on-form.component.html'
})
export class DetailOnFormComponent {

  fontType:string = localStorage.getItem('languageType')
  fontContent = LanguageTypeConfig.detailOnFormComponent[this.fontType];

  betweenMes: {
    date: string
  }
  selectMaxYear = AttendanceConfig.SelectedMaxYear;
  type: string;
  todo: FormGroup;
  timeError:string ='';
  myValidators:{};
  MyValidatorControl: MyValidatorModel;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private validateService: ValidateService,
    private attendanceService: AttendanceService,
    private plugin: PluginService
  ) { }

  ionViewDidLoad() {
    this.type = this.navParams.data.type;
    this.betweenMes = {
      date: ''
    }
    let today = new Date()
    let month = today.getMonth();
    let monthString = month<10?'0'+month:month;
    this.betweenMes.date = today.getFullYear()+'-'+ monthString;
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
        {valiName:'Required',errMessage:this.fontContent.date_required_err,valiValue:true},
        {valiName:'BeforeMonth',errMessage:this.fontContent.date_BeforeMonth_err,valiValue:new Date().getMonth()},
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
  async leaveForm() {
    let loading = this.plugin.createLoading();
    loading.present()
    let res: any = await this.attendanceService.getAttendanceMonth(this.todo.value);
    loading.dismiss()
    if(!res.status) return false;
    if(!res.content) {
      this.plugin.showToast(this.fontContent.no_result)
    } else {
      this.navCtrl.push(AttendanceMonthComponent,{
        attendance_month:res.content
      });
    }
    return false;
  }
}
