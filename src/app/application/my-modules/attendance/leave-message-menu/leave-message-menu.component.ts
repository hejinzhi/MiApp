import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DetailBetweenFormComponent } from '../detail-between-form/detail-between-form.component';
import { DetailOnFormComponent } from '../detail-on-form/detail-on-form.component';
import { HoildayDetailComponent } from '../hoilday-detail/holiday-detail.component';

import { FormType } from '../shared/config/form-type';
import { LanguageTypeConfig } from '../shared/config/language-type.config';

import { AttendanceService } from '../shared/service/attendance.service';
import { PluginService }   from '../../../../core/services/plugin.service';

@Component({
  selector:'sg-leave-message-menu',
  templateUrl: 'leave-message-menu.component.html'
})
export class LeaveMessageMenuComponent {

  fontType:string = localStorage.getItem('languageType')
  fontContent = LanguageTypeConfig.leaveMessageMenuComponent[this.fontType];

  formType = new FormType();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private attendanceService: AttendanceService,
    private plugin: PluginService
   ) {}

  ionViewDidLoad() {
  }

  swipe_note() {
    this.navCtrl.push(DetailBetweenFormComponent,{
      type:this.formType.swipe_note.type
    });
  }

  attendance_month() {
    this.navCtrl.push(DetailOnFormComponent,{
      type:this.formType.attendance_month.type
    });
  }

  attendance_detail() {
    this.navCtrl.push(DetailBetweenFormComponent,{
      type:this.formType.attendance_detail.type
    });
  }

  async to_detail() {
    let loading = this.plugin.createLoading();
    loading.present();
    let res = await this.attendanceService.getLeaveDays();
    loading.dismiss();
    if(!res) return;
    this.navCtrl.push(HoildayDetailComponent,{
      leaveDays:res
    });
  }
}
