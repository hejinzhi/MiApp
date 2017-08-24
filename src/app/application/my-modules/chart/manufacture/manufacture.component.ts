import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'sg-manufacture',
  templateUrl: 'manufacture.component.html',
})
export class ManufactureComponent implements OnInit {
  constructor(private navCtrl: NavController) {  }

  ngOnInit() {}

  mps_day() {
    this.navCtrl.push('MpaDayComponent');
  }

  mps_month() {
    this.navCtrl.push('MpsMonthComponent');
  }

  pl() {
    this.navCtrl.push('PlFlowComponent');
  }
}
