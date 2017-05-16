import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FormType } from '../shared/config/form-type';

@Component({
  selector: 'sg-attendance-detail',
  templateUrl: 'attendance-detail.component.html',
})
export class AttendanceDetailComponent {
  items:any;
  type: string = '';
  user:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
  ionViewDidLoad() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.type = new FormType().attendance_detail.type;
    let attendance_detail = this.navParams.data.attendance_detail;
    this.items = attendance_detail;
    // this.items = [
    //   {
    //     date:'2017-3-20',
    //     inTime_am:'07:56:32',
    //     outTime_am:'12:03:32',
    //     inTime_pm:'12:36:38',
    //     outTime_pm:'07:56:32',
    //     workType:'1F4',
    //     timeCount:'8',
    //     leaveCount:'0',
    //     lateOrEarly:'0',
    //     notWipte:'0',
    //     notWork:'0'
    //   },
    //   {
    //     date:'2017-3-21',
    //     inTime_am:'07:56:32',
    //     outTime_am:'12:03:32',
    //     inTime_pm:'12:36:38',
    //     outTime_pm:'07:56:32',
    //     workType:'1F4',
    //     timeCount:'8',
    //     leaveCount:'0',
    //     lateOrEarly:'0',
    //     notWipte:'0',
    //     notWork:'0'
    //   },
    //   {
    //     date:'2017-3-22',
    //     inTime_am:'07:56:32',
    //     outTime_am:'12:03:32',
    //     inTime_pm:'12:36:38',
    //     outTime_pm:'07:56:32',
    //     workType:'1F4',
    //     timeCount:'8',
    //     leaveCount:'0',
    //     lateOrEarly:'0',
    //     notWipte:'0',
    //     notWork:'0'
    //   }
    // ]

  }

}
