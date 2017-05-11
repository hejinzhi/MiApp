import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular'
import { NavController, NavParams, App, Platform} from 'ionic-angular';

import { LeaveFormComponent } from './leave-form/leave-form.component';
import { OverTimeFormComponent } from './over-time-form/over-time-form.component';
import { BusinessFormComponent } from './business-form/business-form.component';
import { FormListComponent } from './form-list/form-list.component';
import { LeaveSubComponent } from './leave-sub/leave-sub.component';
import { LeaveMessageMenuComponent } from './leave-message-menu/leave-message-menu.component';
import { StatisticsComponent } from './statistics/statistics.component';

import { AttendanceService } from './shared/service/attendance.service';

import { FontTypeConfig } from './shared/config/font-type.config';

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

  fontType:string = localStorage.getItem('fontType')
  fontContent = FontTypeConfig.attendanceComponent[this.fontType];
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
  maintain_leave():void{
    this.navCtrl.push(LeaveFormComponent);
  }

  maintain_OT():void{
    this.navCtrl.push(OverTimeFormComponent);
  }

  cancel_leave():void{
    this.navCtrl.push(FormListComponent,{
      type:'2',
      status:'APPROVED'
    });
  }

  maintain_business():void{
    this.navCtrl.push(BusinessFormComponent);
  }

  maintain_undone(num:number):void{
    this.navCtrl.push(FormListComponent,{
      type:num
    });
  }
}
