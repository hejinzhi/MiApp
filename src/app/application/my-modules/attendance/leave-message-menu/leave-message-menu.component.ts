import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DetailBetweenFormComponent } from '../detail-between-form/detail-between-form.component';
import { DetailOnFormComponent } from '../detail-on-form/detail-on-form.component';

import { FormType } from '../shared/config/form-type';
import { LanguageTypeConfig } from '../shared/config/language-type.config';

@Component({
  selector:'sg-leave-message-menu',
  templateUrl: 'leave-message-menu.component.html'
})
export class LeaveMessageMenuComponent {

  fontType:string = localStorage.getItem('languageType')
  fontContent = LanguageTypeConfig.leaveMessageMenuComponent[this.fontType];

  formType = new FormType();
  constructor(public navCtrl: NavController, public navParams: NavParams ) {}

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
}
