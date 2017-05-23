import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SetComponent } from './set/set.component'
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MeDetailComponent } from './me-detail/me-detail.component';

import { PluginService }   from '../core/services/plugin.service';

@Component({
  selector: 'sg-me',
  templateUrl: 'me.component.html'
})
export class MeComponent {

  mySubcribe:any;
  user:any;
  isLandscape:boolean = false;
  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, private plugin: PluginService) {

  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    let orientation = this.plugin.getScreenOrientation();
    this.isLandscape = orientation.type.indexOf('landscape') > -1? true:false;
    this.mySubcribe = orientation.onChange().subscribe((value) => {
      this.isLandscape = orientation.type.indexOf('landscape') > -1? true:false;
    })
  }
  ionViewWillLeave() {
    this.mySubcribe.unsubscribe();
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
