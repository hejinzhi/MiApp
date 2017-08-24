import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { FormType } from '../shared/config/form-type';
import { HolidayType } from '../shared/config/holiday-type';

@IonicPage()
@Component({
  selector: 'sg-attendance-month',
  templateUrl: 'attendance-month.component.html'
})
export class AttendanceMonthComponent {

  type:string;
  items:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    this.type = new FormType().attendance_month.type;
    let monthData = this.navParams.data.attendance_month;
    let define = new HolidayType().attendanceMonthType;
    this.items = define.map((item:{name:string,type:string}) => {
      return {value:monthData[item.type],type:item.type};
    })
  }
}
