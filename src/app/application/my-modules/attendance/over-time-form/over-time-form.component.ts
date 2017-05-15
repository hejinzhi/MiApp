import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
;
import { ValidateService }   from '../../../../core/services/validate.service';
import { PluginService }   from '../../../../core/services/plugin.service';
import { AttendanceService } from '../shared/service/attendance.service';

import { FormMenuComponent } from '../form-menu/form-menu.component';
import { SignListComponent } from '../sign-list/sign-list.component';

import { MyValidatorModel } from '../../../../shared/models/my-validator.model';
import { MyFormModel } from '../shared/models/my-form.model';
import { HolidayType } from '../shared/config/holiday-type';

import { AttendanceConfig } from '../shared/config/attendance.config';
import { LanguageTypeConfig } from '../shared/config/language-type.config';

@Component({
  selector: 'sg-over-time-form',
  templateUrl: 'over-time-form.component.html'
})
export class OverTimeFormComponent {
  OtMes: {
    reasonType: string,
    OTtime: string,
    startTime: string,
    endTime: string,
    reason: string
  }
  selectMaxYear = AttendanceConfig.SelectedMaxYear;
  formData:MyFormModel = {
    type:'3',
    status:'New',
    No:'',
    data:{}
  }
  fontType:string = localStorage.getItem('languageType')
  fontContent = LanguageTypeConfig.overTimeFormComponent[this.fontType];
  dutyType: string;
  haveSaved:boolean;
  startHourRange:string ='';
  endHourRange:string ='';
  todo: FormGroup;
  timeError: string;
  OTCount: string;
  myValidators:{};
  MyValidatorControl: MyValidatorModel;
  jobType =new HolidayType().jobType;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private formBuilder: FormBuilder,
    private validateService: ValidateService,
    private attendanceService: AttendanceService,
    private plugin: PluginService
  ) { }

  ionViewWillEnter() {
    this.init();
  }
  init() {
    this.startHourRange = this.attendanceService.getTimeRange(0,37);
    this.endHourRange = this.attendanceService.getTimeRange(0,41);
    this.timeError = '';
    this.haveSaved = false;
    this.OTCount = '';
    this.dutyType = '';
    this.formData =  {
      type:'3',
      status:'',
      No:'',
      data:{}
    };
    this.OtMes = {
      reasonType: '',
      OTtime: '',
      startTime: '',
      endTime: '',
      reason: ''
    }
    if(this.navParams.data.detailMes) {
      this.formData = this.navParams.data.detailMes;
      this.OtMes = this.navParams.data.detailMes.data;
      this.OTCount = this.navParams.data.detailMes.data.count || '';
      this.dutyType = this.navParams.data.detailMes.data.duty_type || '';
      this.haveSaved = true;
    }
    this.todo = this.initWork(this.OtMes);
    this.MyValidatorControl = this.initValidator(this.OtMes);
    this.myValidators = this.MyValidatorControl.validators;
    for (let prop in this.myValidators) {
      this.todo.controls[prop].valueChanges.subscribe((value: any) => this.check(value, prop));
    }
    this.todo.controls['OTtime'].valueChanges.subscribe((value: any) => this.getDutyType());
    this.setDefaultDate();
  }
  setDefaultDate() {
    if(this.haveSaved) return;
    let today = new Date();
    this.todo.controls['OTtime'].setValue(today.toISOString().substr(0,today.toISOString().indexOf('T')));
  }
  async getDutyType() {
    let values = this.todo.controls;
    this.formData.data = {
      reasonType: '',
      OTtime: values.OTtime.value,
      startTime: '',
      endTime: '',
      reason: ''
    }
    let result:any = await this.attendanceService.getOverTimeDetail(this.formData);
    if(!result) return;
    this.dutyType = result.data.duty_type || '';
    this.todo.controls['startTime'].setValue(result.data.startTime);
  }
  initValidator(bind:any) {
    let newValidator = new MyValidatorModel([
      {name:'reasonType',valiItems:[{valiName:'Required',errMessage:this.fontContent.reason_required_err,valiValue:true}]},
      {name:'OTtime',valiItems:[{valiName:'Required',errMessage:this.fontContent.OTtime_required_err,valiValue:true}]},
      {name:'reason',valiItems:[
        {valiName:'Required',errMessage:this.fontContent.reason_required_err,valiValue:true},
        {valiName:'Minlength',errMessage:this.fontContent.reason_minlength_err,valiValue:2}
      ]},
      {name:'startTime',valiItems:[
        {valiName:'Required',errMessage:this.fontContent.startTime_required_err,valiValue:true},
        {valiName:'TimeSmaller',errMessage:this.fontContent.startTime_timeSmaller_err,valiValue:'endTime'}
      ]},
      {name:'endTime',valiItems:[
        {valiName:'Required',errMessage:this.fontContent.endTime_required_err,valiValue:true},
        {valiName:'TimeBigger',errMessage:this.fontContent.endTime_timeBigger_err,valiValue:'startTime'}
      ]}
    ],bind)
    return newValidator;
  }
  //初始化原始數據
  initWork(work: any): FormGroup {
    return this.formBuilder.group({
      reasonType: [work.reasonType, Validators.required],
      startTime: [work.startTime, Validators.required],
      endTime: [work.endTime, Validators.required],
      OTtime: [work.OTtime, Validators.required],
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
      if (name === 'startTime' || name === 'endTime') {
        this.timeError = prams.mes;
      }
      return Promise.resolve(this.myValidators);
    });
  }
  presentPopover(myEvent:any) {
    this.formData.data = this.todo.value
    let popover = this.popoverCtrl.create(FormMenuComponent,{
      formData:this.formData,
      haveSaved:this.haveSaved,
      navCtrl:this.navCtrl
    });
    popover.present({
      ev: myEvent
    });
  }
  async leaveForm() {
    this.formData.data = this.todo.value
    let loading = this.plugin.createLoading();
    loading.present()
    let res:any = await this.attendanceService.sendSign(this.formData);
    loading.dismiss()
    if(res.status) {
      this.plugin.showToast(this.fontContent.sign_success);
      // this.navCtrl.canGoBack()?this.navCtrl.popToRoot():'';
    }
    if(res.content) {
      this.OTCount = res.content.HOURS;
      this.haveSaved = true;
    }
    return false;
  }
  async saveForm() {
    this.formData.data = this.todo.value
    let loading = this.plugin.createLoading();
    loading.present()
    let res:any = await this.attendanceService.saveOverTimeForm(this.formData);
    loading.dismiss()
    console.log(res)
    if(!res) return;
    this.OTCount = res.HOURS;
    this.formData.No = res.DOCNO
    this.haveSaved = true;
    this.plugin.showToast(this.fontContent.save_success);
  }
}
