import { Subscription } from 'rxjs/rx';
import { Store } from '@ngrx/store';
import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { MyStore } from './../shared/store';
import { UserState } from './../shared/models/user.model';

@IonicPage()
@Component({
  selector: 'sg-me',
  templateUrl: 'me.component.html'
})
export class MeComponent implements OnDestroy {


  user:UserState;

  mySubscription: Subscription
  constructor(
    public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private ref: ChangeDetectorRef,
    private store$: Store<MyStore>
  ) {

  }

  ionViewDidLoad() {
    this.mySubscription = this.store$.select('userReducer').subscribe((user:UserState) => this.user = user);
  }

  ionViewWillLeave() {

  }
  ngOnDestroy() {
    this.mySubscription.unsubscribe();
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
