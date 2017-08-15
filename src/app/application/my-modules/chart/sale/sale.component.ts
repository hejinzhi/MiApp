import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'sg-sale',
  templateUrl: 'sale.component.html',
})
export class SaleComponent {
  constructor(private navCtrl: NavController) {  }

  sale_day() {
    this.navCtrl.push('SaleDayComponent')
  }

  sale_month() {
    this.navCtrl.push('SaleMonthComponent');
  }

}
