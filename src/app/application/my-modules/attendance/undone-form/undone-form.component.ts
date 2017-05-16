import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidateService }   from '../../../../core/services/validate.service';
import { PluginService }   from '../../../../core/services/plugin.service';
import { AttendanceService } from '../shared/service/attendance.service';

import { HolidayType } from '../shared/config/holiday-type';

import { MyValidatorModel } from '../../../../shared/models/my-validator.model';
import { MyFormModel } from '../shared/models/my-form.model';

@Component({
  selector: 'sg-undone-form',
  templateUrl: 'undone-form.component.html'
})
export class UndoneFormComponent {

  leaveMes: {
    absentType:string
    reasonType: string,
    startTime: string,
    endTime: string,
    reason: string
  }
  formData:MyFormModel = {
    type:'',
    status:'New',
    No:'HTL021703007172',
    data:{}
  }
  hourCount:string;
  dayCount:string;
  dutyType:string;
  todo: FormGroup;
  myValidators:{};
  MyValidatorControl: MyValidatorModel;
  holidayType:any;
  absentType: any;
  needReasonType: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private validateService: ValidateService,
    private plugin: PluginService,
    private attendanceService: AttendanceService
  ) { }

  ionViewDidLoad() {
    this.holidayType = localStorage.getItem('leaveType')? JSON.parse(localStorage.getItem('leaveType')):new HolidayType().type;
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
    this.MyValidatorControl = this.initValidator(this.leaveMes);
    this.myValidators = this.MyValidatorControl.validators;
    for (let prop in this.myValidators) {
      this.todo.controls[prop].valueChanges.subscribe((value: any) => this.check(value, prop));
    }
    this.todo.controls['absentType'].valueChanges.subscribe((value: any) => {
      if(value === '2') {
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
  initValidator(bind:any) {
    let newValidator = new MyValidatorModel([
      {name:'absentType',valiItems:[{valiName:'Required',errMessage:'请选择缺席类型',valiValue:true}]},
      {name:'reasonType',valiItems:[]},
      {name:'reason',valiItems:[
        {valiName:'Required',errMessage:'原因不能为空',valiValue:true},
        {valiName:'Minlength',errMessage:'原因长度不能少于2位',valiValue:2}
      ]},
      {name:'startTime',valiItems:[
        {valiName:'Required',errMessage:'开始时间不能为空',valiValue:true},
      ]},
      {name:'endTime',valiItems:[
        {valiName:'Required',errMessage:'结束时间不能为空',valiValue:true},
      ]}
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
  leaveForm() {
    this.formData.data = this.todo.value
    console.log(this.formData);
    return false;
  }
  async saveForm() {
    Object.assign(this.formData.data, this.todo.value);
    let loading = this.plugin.createLoading();
    loading.present()
    let res: any = await this.attendanceService.processOffDutyException(this.formData);
    loading.dismiss()
    if(res.status) {
      this.plugin.showToast('提交成功');
      this.navCtrl.popToRoot();
    }
  }
}
