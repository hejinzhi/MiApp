import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SetComponent } from './set/set.component'
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MeDetailComponent } from './me-detail/me-detail.component';

@Component({
  selector: 'sg-me',
  templateUrl: 'me.component.html'
})
export class MeComponent {

  user;
  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner) {

  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  goSetting(): void {
    this.navCtrl.push(SetComponent, {

    });
  }

  goToMyDetail(): void {
    this.navCtrl.push(MeDetailComponent, { user: this.user });
  }

  // 获取二维码信息
  getQrMessage(): void {
    this.barcodeScanner.scan().then((barcodeData) => {
      console.log(barcodeData)
    }, (err) => {
      console.log(err)
    });
  }
}
