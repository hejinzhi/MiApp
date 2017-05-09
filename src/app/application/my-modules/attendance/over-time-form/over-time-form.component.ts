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

  ionViewWillLeave() {
    this.ionViewDidLoad();
  }
  ionViewDidLoad() {
    this.startHourRange = this.attendanceService.getTimeRange(0,37);
    this.endHourRange = this.attendanceService.getTimeRange(0,41);
    this.timeError = '';
    this.haveSaved = false;
    this.OTCount = '';
    this.dutyType = '';
    this.formData =  {
      type:'3',
      status:'New',
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
  }
  initValidator(bind:any) {
    let newValidator = new MyValidatorModel([
      {name:'reasonType',valiItems:[{valiName:'Required',errMessage:'请选择加班类型',valiValue:true}]},
      {name:'OTtime',valiItems:[{valiName:'Required',errMessage:'加班日期不能为空',valiValue:true}]},
      {name:'reason',valiItems:[
        {valiName:'Required',errMessage:'原因不能为空',valiValue:true},
        {valiName:'Minlength',errMessage:'原因长度不能少于2位',valiValue:2}
      ]},
      {name:'startTime',valiItems:[
        {valiName:'Required',errMessage:'开始时间不能为空',valiValue:true},
        {valiName:'TimeSmaller',errMessage:'结束时间必须迟于开始时间',valiValue:'endTime'}
      ]},
      {name:'endTime',valiItems:[
        {valiName:'Required',errMessage:'结束时间不能为空',valiValue:true},
        {valiName:'TimeBigger',errMessage:'结束时间必须迟于开始时间',valiValue:'startTime'}
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
    console.log(value)
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
      this.plugin.showToast('送签成功');
      this.navCtrl.canGoBack()?this.navCtrl.popToRoot():'';
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
    this.plugin.showToast('表单保存成功');
  }
  sign_list() {
    this.navCtrl.push(SignListComponent,{
      formData: this.formData
    })
  }
}
