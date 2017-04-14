import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SetComponent } from './set/set.component'

@Component({
  selector: 'sg-me',
  templateUrl: 'me.component.html'
})
export class MeComponent {

  user;
  constructor(public navCtrl: NavController) {

  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  goSetting(): void {
    this.navCtrl.push(SetComponent, {

    });
  }

  // toMyDetail(): void {
  //   this.navCtrl.push(MyDetailPage, {
  //     photo: this.serverPhoto
  //   });
  // }

  // // 获取二维码信息
  // getQrMessage(): void {
  //   BarcodeScanner.scan().then((barcodeData) => {
  //     console.log(barcodeData)
  //   }, (err) => {
  //     console.log(err)
  //   });
  //
  //
  // }
}
