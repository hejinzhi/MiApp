import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { FormType } from '../shared/config/form-type';
import { LanguageTypeConfig } from '../shared/config/language-type.config';

@IonicPage()
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
  }

}
