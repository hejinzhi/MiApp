import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, AlertController, IonicPage} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { ValidateService }   from '../../../../core/services/validate.service';
import { PluginService }   from '../../../../core/services/plugin.service';
import { AttendanceService } from '../shared/service/attendance.service';

import { MyValidatorModel } from '../../../../shared/models/my-validator.model';
import { MyFormModel } from '../shared/models/my-form.model';
import { HolidayType } from '../shared/config/holiday-type';

import { AttendanceConfig } from '../shared/config/attendance.config';
import { LanguageTypeConfig } from '../shared/config/language-type.config';

@IonicPage()
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
  showReset:boolean;
  startHourRange:string ='';
  endHourRange:string ='';
  errTip:string ='';
  todo: FormGroup;
  timeError: string;
  OTCount: string;
  myValidators:{};
  MyValidatorControl: MyValidatorModel;
  jobType =new HolidayType().jobType;
  translateTexts: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private validateService: ValidateService,
    private attendanceService: AttendanceService,
    private plugin: PluginService,
    private translate: TranslateService
  ) { }

  ionViewDidLoad() {
    this.init();
  }
  init() {
    this.startHourRange = this.attendanceService.getTimeRange(0,37);
    this.endHourRange = this.attendanceService.getTimeRange(0,41);
    this.timeError = '';
    this.errTip = '';
    this.showReset = true;
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
      this.showReset = false;
      this.formData = this.navParams.data.detailMes;
      this.OtMes = this.navParams.data.detailMes.data;
      this.OTCount = this.navParams.data.detailMes.data.count || '';
      this.dutyType = this.navParams.data.detailMes.data.duty_type || '';
      this.haveSaved = true;
    }
    this.todo = this.initWork(this.OtMes);
    this.subscribeTranslateText();
    this.MyValidatorControl = this.initValidator(this.OtMes);
    this.myValidators = this.MyValidatorControl.validators;
    for (let prop in this.myValidators) {
      this.todo.controls[prop].valueChanges.subscribe((value: any) => this.check(value, prop));
    }
    this.todo.controls['OTtime'].valueChanges.subscribe((value: any) => this.getDutyType());
    this.setDefaultDate();
  }

  subscribeTranslateText() {
    this.translate.get(['attendance.sign_success', 'attendance.save_success',
    'attendance.OTreasonType_required_err', 'attendance.OTtime_required_err', 'attendance.startTime_timeSmaller_err',
    'attendance.endTime_timeBigger_err', 'attendance.alert_title', 'attendance.cancle', 'attendance.confirm',
     'attendance.reason_required_err','attendance.reason_minlength_err','attendance.startTime_required_err',
     'attendance.endTime_required_err'
  ]).subscribe((res) => {
        this.translateTexts = res;
      })
  }


  reSet() {
    let confirm = this.alertCtrl.create({
      title: this.translateTexts['attendance.alert_title'],
      buttons: [
        {
          text: this.translateTexts['attendance.cancle'],
          handler: () => {
          }
        },
        {
          text: this.translateTexts['attendance.confirm'],
          handler: () => {
            this.init();
          }
        }
      ]
    });
    confirm.present();
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
    this.todo.controls['endTime'].setValue(result.data.endTime);
  }
  initValidator(bind:any) {
    let newValidator = new MyValidatorModel([
      {name:'reasonType',valiItems:[{valiName:'Required',errMessage:this.translateTexts['reason_required_err'],valiValue:true}]},
      {name:'OTtime',valiItems:[{valiName:'Required',errMessage:this.translateTexts['OTtime_required_err'],valiValue:true}]},
      {name:'reason',valiItems:[
        {valiName:'Required',errMessage:this.translateTexts['reason_required_err'],valiValue:true},
        {valiName:'Minlength',errMessage:this.translateTexts['reason_minlength_err'],valiValue:2}
      ]},
      {name:'startTime',valiItems:[
        {valiName:'Required',errMessage:this.translateTexts['startTime_required_err'],valiValue:true},
        {valiName:'TimeSmaller',errMessage:this.translateTexts['startTime_timeSmaller_err'],valiValue:'endTime'}
      ]},
      {name:'endTime',valiItems:[
        {valiName:'Required',errMessage:this.translateTexts['endTime_required_err'],valiValue:true},
        {valiName:'TimeBigger',errMessage:this.translateTexts['endTime_timeBigger_err'],valiValue:'startTime'}
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
    let popover = this.popoverCtrl.create('FormMenuComponent',{
      this:this,
    });
    popover.present({
      ev: myEvent
    });
  }
  async leaveForm() {
    Object.assign(this.formData.data, this.todo.value);
    let loading = this.plugin.createLoading();
    loading.present()
    let res:any = await this.attendanceService.sendSign(this.formData);
    loading.dismiss()
    if(res.status) {
      this.plugin.showToast(this.translateTexts['sign_success']);
      this.formData.status = 'WAITING';
      // this.navCtrl.canGoBack()?this.navCtrl.popToRoot():'';
      let content = res.content;
      if (content) {
        this.errTip = '';
        this.OTCount = content.HOURS;
        this.formData.No = content.DOCNO;
        this.haveSaved = true;
      }
    } else {
      console.log(res)
      this.errTip = res.content;
    }
    return false;
  }
  async saveForm() {
    Object.assign(this.formData.data, this.todo.value);
    let loading = this.plugin.createLoading();
    loading.present()
    let res:any = await this.attendanceService.saveOverTimeForm(this.formData);
    loading.dismiss()
    console.log(res)
    if (!res.status) {
      this.errTip = res.content;
    } else {
      this.errTip = '';
      let data = res.content
      this.OTCount = data.HOURS;
      this.formData.No = data.DOCNO
      this.formData.status = data.STATUS;
      this.haveSaved = true;
      this.plugin.showToast(this.translateTexts['save_success']);
    };
  }
}
