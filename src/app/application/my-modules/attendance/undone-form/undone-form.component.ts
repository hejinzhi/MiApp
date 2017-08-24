import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { ValidateService } from '../../../../core/services/validate.service';
import { PluginService } from '../../../../core/services/plugin.service';
import { AttendanceService } from '../shared/service/attendance.service';
import { HolidayType } from '../shared/config/holiday-type';
import { LanguageTypeConfig } from '../shared/config/language-type.config';

import { MyValidatorModel } from '../../../../shared/models/my-validator.model';
import { MyFormModel } from '../shared/models/my-form.model';

@IonicPage()
@Component({
  selector: 'sg-undone-form',
  templateUrl: 'undone-form.component.html'
})
export class UndoneFormComponent {

  fontType: string = localStorage.getItem('languageType')
  fontContent = LanguageTypeConfig.undoneFormComponent[this.fontType];

  leaveMes: {
    absentType: string
    reasonType: string,
    startTime: string,
    endTime: string,
    reason: string
  }
  formData: MyFormModel = {
    type: '',
    status: 'New',
    No: 'HTL021703007172',
    data: {}
  }
  errTip: string;
  hourCount: string;
  dayCount: string;
  dutyType: string;
  todo: FormGroup;
  myValidators: {};
  MyValidatorControl: MyValidatorModel;
  holidayType: any;
  absentType: any;
  needReasonType: boolean = false;
  translateTexts: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private validateService: ValidateService,
    private plugin: PluginService,
    private attendanceService: AttendanceService,
    private translate: TranslateService
  ) { }

  ionViewDidLoad() {
    this.holidayType = localStorage.getItem('leaveType') ? JSON.parse(localStorage.getItem('leaveType')) : new HolidayType().type;
    this.absentType = new HolidayType().absentType;
    this.leaveMes = {
      absentType: '',
      reasonType: '',
      startTime: '',
      endTime: '',//"2017-01-01T01:00:00Z",
      reason: ''
    }
    this.formData = this.navParams.data.detailMes;
    this.leaveMes = this.navParams.data.detailMes.data;
    this.dayCount = this.formData.data.days;
    this.hourCount = this.formData.data.hours;
    this.dutyType = this.formData.data.duty_type;
    this.todo = this.initWork(this.leaveMes);
    this.subscribeTranslateText();
    this.MyValidatorControl = this.initValidator(this.leaveMes);
    this.myValidators = this.MyValidatorControl.validators;
    for (let prop in this.myValidators) {
      this.todo.controls[prop].valueChanges.subscribe((value: any) => this.check(value, prop));
    }
    this.todo.controls['absentType'].valueChanges.subscribe((value: any) => {
      if (value === '2') {
        this.needReasonType = false;
        this.todo.controls['reasonType'].clearValidators();
        this.todo.controls['reasonType'].setValue('');
      } else {
        this.needReasonType = true;
        this.todo.controls['reasonType'].setValidators([Validators.required]);
      }
    })
    this.todo.controls['absentType'].setValue(this.formData.data.absentType);
  }
  subscribeTranslateText() {
    this.translate.get(['attendance.absentType_required_err', 'attendance.reason_required_err', 'attendance.reason_minlength_err', 'attendance.startTime_required_err',
      'attendance.endTime_required_err']).subscribe((res) => {
        this.translateTexts = res;
      })
  }
  initValidator(bind: any) {
    let newValidator = new MyValidatorModel([
      { name: 'absentType', valiItems: [{ valiName: 'Required', errMessage: this.translateTexts['attendance.absentType_required_err'], valiValue: true }] },
      { name: 'reasonType', valiItems: [] },
      {
        name: 'reason', valiItems: [
          { valiName: 'Required', errMessage: this.translateTexts['attendance.reason_required_err'], valiValue: true },
          { valiName: 'Minlength', errMessage: this.translateTexts['attendance.reason_minlength_err'], valiValue: 2 }
        ]
      },
      {
        name: 'startTime', valiItems: [
          { valiName: 'Required', errMessage: this.translateTexts['attendance.startTime_required_err'], valiValue: true },
        ]
      },
      {
name: 'endTime', valiItems: [
          { valiName: 'Required', errMessage: this.translateTexts['attendance.endTime_required_err'], valiValue: true },
        ]
      }
    ])
    return newValidator;
  }
  //初始化原始數據
  initWork(work: any): FormGroup {
    return this.formBuilder.group({
      absentType: [work.absentType, Validators.required],
      reasonType: [work.reasonType],
      startTime: [work.startTime, Validators.required],
      endTime: [work.endTime, Validators.required],
      reason: [work.reason, Validators.required],
    });
  }

  //單獨輸入塊驗證
  check(value: any, name: string): Promise<any> {
    this.myValidators[name].value = value;
    let compare = this.myValidators[name].compare ? this.myValidators[this.myValidators[name].compare] : ''
    return this.validateService.check(this.myValidators[name], this.myValidators).then((prams) => {
      this.myValidators[name].error = prams.mes;
      this.myValidators[name].pass = !prams.mes;
      return Promise.resolve(this.myValidators);
    });
  }
  async saveForm() {
    Object.assign(this.formData.data, this.todo.value);
    let loading = this.plugin.createLoading();
    loading.present()
    let res: any = await this.attendanceService.processOffDutyException(this.formData);
    loading.dismiss()
    if (res.status) {
      this.errTip = '';
      this.plugin.showToast(this.fontContent.submit_succ);
      this.navCtrl.popToRoot();
    } else {
      this.errTip = res.content;
    }
  }
}
