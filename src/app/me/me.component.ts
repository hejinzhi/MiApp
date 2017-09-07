import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { LanguageConfig } from './shared/config/language.config';


@IonicPage()
@Component({
  selector: 'sg-me',
  templateUrl: 'me.component.html'
})
export class MeComponent {

  user:any;
  constructor(
    public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private ref: ChangeDetectorRef
  ) {

  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }
  ionViewWillLeave() {
  }
  goSetting(): void {
    this.navCtrl.push('SetComponent', {

    });
  }

  goToMyDetail(): void {
    this.navCtrl.push('MeDetailComponent', { user: this.user });
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
