import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidateService }   from '../../../../core/services/validate.service';
import { AttendanceService } from '../shared/service/attendance.service';
import { PluginService }   from '../../../../core/services/plugin.service';

import { MyValidatorModel } from '../../../../shared/models/my-validator.model';
import { FormType } from '../shared/config/form-type';

import { AttendanceConfig } from '../shared/config/attendance.config';
import { LanguageTypeConfig } from '../shared/config/language-type.config';

@IonicPage()
@Component({
  selector: 'sg-search-form',
  templateUrl: 'search-form.component.html'
})
export class SearchFormComponent {
  searchMes: {
    type: string,
    startTime: string,
    endTime: string,
    form_No: string,
  }

  fontType:string = localStorage.getItem('languageType')
  fontContent = LanguageTypeConfig.searchFormComponent[this.fontType];

  selectMaxYear = AttendanceConfig.SelectedMaxYear;
  todo: FormGroup;
  myformType = new FormType();
  timeError: string = '';
  myValidators: {};
  MyValidatorControl: MyValidatorModel;
  formType: { type: string, name: string }[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private validateService: ValidateService,
    private attendanceService: AttendanceService,
    private plugin: PluginService,
  ) { }

  ionViewDidLoad() {
    this.formType = this.myformType.type;
    let date = new Date();
    let today = date.toISOString();
    let month = date.getMonth();
    let year = date.getFullYear();
    let startTime = '';
    if(month === 0) {
      startTime = year-1+'-'+'12'+'-'+'26';
    } else {
      let monthString = month<10?'0'+month:month;
      startTime = year+'-'+ monthString +'-'+'26';
    }
    today = today.substr(0,today.indexOf('T'));
    this.searchMes = {
      type: '',
      startTime: startTime,
      endTime: today,
      form_No: ''
    }
    this.searchMes.type = this.navParams.data.type || '';
    this.todo = this.initWork(this.searchMes);
    this.MyValidatorControl = this.initValidator();
    this.myValidators = this.MyValidatorControl.validators;
    for (let prop in this.myValidators) {
      this.todo.controls[prop].valueChanges.subscribe((value: any) => this.check(value, prop));
    }
  }
  initValidator() {
    let form_No_reg = '^[Hh]{1}[Tt]{1}';
    let form_No_reg_mes = this.fontContent.form_No_reg_mes;
    switch (Number(this.searchMes.type)) {
      case 2:
        form_No_reg = '^[Hh]{1}[Tt]{1}[Ll]{1}';
        form_No_reg_mes = this.fontContent.form_No_reg_mes2;
        break;
      case 3:
        form_No_reg = '^[Hh]{1}[Tt]{1}[Oo]{1}';
        form_No_reg_mes = this.fontContent.form_No_reg_mes3;
        break;
      default:
        break;
    }
    let newValidator = new MyValidatorModel([
      { name: 'type', valiItems: [{ valiName: 'Required', errMessage: this.fontContent.type_required_err, valiValue: true }] },
      {
        name: 'form_No', valiItems: [
          { valiName: 'Length', errMessage: this.fontContent.form_No_length_err, valiValue: 15 },
          { valiName: 'Regex', errMessage: form_No_reg_mes, valiValue: form_No_reg }
        ]
      },
      {
        name: 'startTime', valiItems: [
          { valiName: 'DateNotBigger', errMessage: this.fontContent.startTime_dateNotBigger_err, valiValue: 'endTime' }
        ]
      },
      {
        name: 'endTime', valiItems: [
          { valiName: 'DateNotSmaller', errMessage: this.fontContent.endTime_DateNotSmaller_err, valiValue: 'startTime' }
        ]
      }
    ],this.searchMes)
    return newValidator;
  }
  //初始化原始數據
  initWork(work: any): FormGroup {
    return this.formBuilder.group({
      type: [work.type, Validators.required],
      startTime: [work.startTime],
      endTime: [work.endTime],
      form_No: [work.form_No]
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
    console.log(this.todo.value);
    let res: any = [];
    let loading = this.plugin.createLoading();
    loading.present();
    res = await this.attendanceService.getForm(this.todo.value);
    loading.dismiss();
    if(!res.status) return;
    console.log(res);
    if (res.content.length === 0) {
      this.plugin.showToast(this.fontContent.no_result);
      return false;
    }
    this.navCtrl.push('FormListComponent', {
      type: this.todo.value.type,
      formData: res.content
    })
    return false;
  }
}
