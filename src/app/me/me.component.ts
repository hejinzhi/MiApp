import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { PluginService } from '../core/services/plugin.service';

@IonicPage()
@Component({
  selector: 'sg-me',
  templateUrl: 'me.component.html'
})
export class MeComponent {

  mySubcribe: any;
  user: any;
  isLandscape: boolean = false;
  constructor(
    public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private plugin: PluginService,
    private ref: ChangeDetectorRef
  ) {

  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    let orientation = this.plugin.getScreenOrientation();
    this.isLandscape = orientation.type.indexOf('landscape') > -1 ? true : false;
    this.mySubcribe = orientation.onChange().subscribe((value) => {
      this.isLandscape = orientation.type.indexOf('landscape') > -1 ? true : false;
      this.ref.detectChanges();
    })
  }
  ionViewWillLeave() {
    this.mySubcribe.unsubscribe();
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
