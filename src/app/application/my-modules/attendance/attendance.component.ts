import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular'
import { NavController, NavParams, App, Platform, IonicPage } from 'ionic-angular';

import { LeaveFormComponent } from './leave-form/leave-form.component';
import { OverTimeFormComponent } from './over-time-form/over-time-form.component';
import { BusinessFormComponent } from './business-form/business-form.component';
import { FormListComponent } from './form-list/form-list.component';
import { LeaveMessageMenuComponent } from './leave-message-menu/leave-message-menu.component';
import { LeaveSubComponent } from './leave-sub/leave-sub.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AttendanceService } from './shared/service/attendance.service';

import { LanguageTypeConfig } from './shared/config/language-type.config';

// @IonicPage()
@Component({
  selector:'sg-attendance',
  templateUrl: 'attendance.component.html'
})
export class AttendanceComponent {

  @ViewChild('attendance') attendance: Tabs;

  tab1Root = FormListComponent;
  tab2Root = OverTimeFormComponent;
  tab3Root = LeaveSubComponent;
  tab4Root = LeaveMessageMenuComponent;
  tab5Root = StatisticsComponent;

  fontType:string = localStorage.getItem('languageType')
  fontContent = LanguageTypeConfig.attendanceComponent[this.fontType];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app :App,
    private platform: Platform,
    private attendanceService: AttendanceService
  ) {}

  ionViewDidLoad() {
    this.attendanceService.getLeaveReasonType();
  }
  ionViewWillLeave() {

  }
}
