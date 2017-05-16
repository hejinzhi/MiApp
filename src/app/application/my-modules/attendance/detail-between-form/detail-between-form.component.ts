import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidateService }   from '../../../../core/services/validate.service';
import { PluginService }   from '../../../../core/services/plugin.service';
import { AttendanceService } from '../shared/service/attendance.service';

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
    let today = new Date().toISOString();
    today = today.substr(0,today.indexOf('T'));
    this.betweenMes = {
      startTime: today,
      endTime: today,
    }
    this.todo = this.initWork(this.betweenMes);
    this.MyValidatorControl = this.initValidator();
    this.myValidators = this.MyValidatorControl.validators;
    for (let prop in this.myValidators) {
      this.todo.controls[prop].valueChanges.subscribe((value: any) => this.check(value, prop));
    }
    this.myValidators['startTime'].value = this.myValidators['endTime'].value = today;
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
  async leaveForm() {
    let formType = new FormType()
    console.log(this.todo.value);
    if(this.type === formType.swipe_note.type) {
      let loading = this.plugin.createLoading();
      loading.present()
      let res: any = await this.attendanceService.getSwipeNote(this.todo.value);
      loading.dismiss()
      if(!res.status) return false;
      if(res.content && res.content instanceof Array && res.content.length>0) {
        this.navCtrl.push(SwipeNoteComponent,{
          swipe_note:res.content
        })
      } else {
        this.plugin.showToast('没有此段时间的刷卡记录')
      }
    }
    if(this.type === formType.attendance_detail.type) {
      let loading = this.plugin.createLoading();
      loading.present()
      let res: any = await this.attendanceService.getAttendanceDetail(this.todo.value);
      loading.dismiss()
      if(!res.status) return false;
      if(res.content && res.content instanceof Array && res.content.length>0) {
        this.navCtrl.push(AttendanceDetailComponent,{
          attendance_detail:res.content
        })
      } else {
        this.plugin.showToast('没有此段时间的考勤明细记录')
      }
    }
    return false;
  }
}
