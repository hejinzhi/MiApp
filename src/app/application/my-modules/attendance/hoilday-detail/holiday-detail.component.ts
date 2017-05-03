import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as echarts from 'echarts';

@Component({
  selector: 'sg-hoilday-detail',
  templateUrl: 'holiday-detail.component.html'
})
export class HoildayDetailComponent {

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
