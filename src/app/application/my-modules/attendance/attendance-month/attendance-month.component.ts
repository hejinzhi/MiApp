import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FormType } from '../shared/config/form-type';

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
    this.items=[
      { value: '22', type: 'SA_DAYS' },
      { value: '22', type: 'NEED_DAYS' },
      { value: '19', type: 'PRESENT_DAYS' },
      { value: '2', type: 'SA_OFFDUTY_DAYS' },
      { value: '0', type: 'LEGAL_SA_DAYS' },
      { value: '0', type: 'ABSENT_LEAVE' },
      { value: '0', type: 'SICK_LEAVE' },
      { value: '0', type: 'WITHOUT_LEAVE' },
      { value: '0', type: 'OFFDUTY_DAYS' },
      { value: '0', type: 'LATE' },
      { value: '0', type: 'LATE_TIME' },
      { value: '0', type: 'OVER_PAY' },
      { value: '0', type: 'REPAY' },
      { value: '1', type: 'NOCARD_COUNT' },
      { value: '2', type: 'STOP_DAYS' },
      { value: '0', type: 'NIGHT_SUBSIDY' },
      { value: '0', type: 'NIGHT_SUBSIDY_LITTLE' },
      { value: '1', type: 'LAST1_NS' },
      { value: '1', type: 'LAST2_NS' },
      { value: '2', type: 'TOT_DUTY' },
      { value: '3', type: 'OVERTIME_HOURS1_133' },
      { value: '8', type: 'SAT_DAYS' },
      { value: '0', type: 'OVERTIME_HOURS2_2' },
      { value: '0', type: 'OVERTIME_HOURS2_133' },
      { value: '0', type: 'LEGAL_OVER_HOURS' },
      { value: '0', type: 'CONTINUE_OFF_DAYS' },
      { value: '0', type: 'NO_SHEET' },
      { value: '0', type: 'CHILDBIRTH_LEAVE' },
      { value: '0', type: 'OFFDUTY_DAYS' }
    ]
  }
}
