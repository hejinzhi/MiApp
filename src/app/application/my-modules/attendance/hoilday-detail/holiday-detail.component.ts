import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { LanguageTypeConfig } from '../shared/config/language-type.config';

@IonicPage()
@Component({
  selector: 'sg-hoilday-detail',
  templateUrl: 'holiday-detail.component.html'
})
export class HoildayDetailComponent {

  fontType:string = localStorage.getItem('languageType')
  fontContent = LanguageTypeConfig.holidayDetailComponent[this.fontType];

  leaveDays:{STADATE:string,detail_used:{type:string,value:string}[],detail_canUse:{type:string,value:string}[]};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {
    this.leaveDays = this.navParams.data.leaveDays;
    this.leaveDays.detail_used.sort((a:{type:string,value:string},b:{type:string,value:string}) =>
    Number(b.value)-Number(a.value));
  }

}
