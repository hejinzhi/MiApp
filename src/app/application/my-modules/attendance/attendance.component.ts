import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular'
import { NavController, NavParams, App, Platform, IonicPage } from 'ionic-angular';

import { AttendanceService } from './shared/service/attendance.service';


@IonicPage()
@Component({
  selector:'sg-attendance',
  templateUrl: 'attendance.component.html'
})
export class AttendanceComponent {

  @ViewChild('attendance') attendance: Tabs;

  tab1Root = 'FormListComponent';
  tab2Root = 'OverTimeFormComponent';
  tab3Root = 'LeaveSubComponent';
  tab4Root = 'LeaveMessageMenuComponent';
  tab5Root = 'StatisticsComponent';

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
