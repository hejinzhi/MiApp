import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { ValidateService }   from '../../../../core/services/validate.service';
import { PluginService }   from '../../../../core/services/plugin.service';
import { AttendanceService } from '../shared/service/attendance.service';

import { MyValidatorModel } from '../../../../shared/models/my-validator.model';

import { FormType } from '../shared/config/form-type';

import { AttendanceConfig } from '../shared/config/attendance.config';
import { LanguageTypeConfig } from '../shared/config/language-type.config';

@IonicPage()
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
  selectMaxYear = AttendanceConfig.SelectedMaxTime;
  type: string;
  todo: FormGroup;
  timeError:string ='';
  myValidators:{};
  MyValidatorControl: MyValidatorModel;
  translateTexts: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private validateService: ValidateService,
    private attendanceService: AttendanceService,
    private plugin: PluginService,
    private translate: TranslateService
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
    this.subscribeTranslateText();
    this.todo = this.initWork(this.betweenMes);
    this.MyValidatorControl = this.initValidator();
    this.myValidators = this.MyValidatorControl.validators;
    for (let prop in this.myValidators) {
      this.todo.controls[prop].valueChanges.subscribe((value: any) => this.check(value, prop));
    }
  }

  subscribeTranslateText() {
    this.translate.get(['attendance.date_required_err', 'attendance.date_BeforeMonth_err',
    'attendance.no_month_result']).subscribe((res) => {
        this.translateTexts = res;
      })
  }

  initValidator() {
    let newValidator = new MyValidatorModel([
      {name:'date',valiItems:[
        {valiName:'Required',errMessage:this.translateTexts['attendance.date_required_err'],valiValue:true},
        {valiName:'BeforeMonth',errMessage:this.translateTexts['attendance.date_BeforeMonth_err'],valiValue:new Date().getMonth()},
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
      this.plugin.showToast(this.translateTexts['attendance.no_result'])
    } else {
      this.navCtrl.push('AttendanceMonthComponent',{
        attendance_month:res.content
      });
    }
    return false;
  }
}
