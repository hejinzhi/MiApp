import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { JMessageService } from '../../core/services/jmessage.service'
import { PluginService } from '../../core/services/plugin.service';
import { MeService } from '../shared/service/me.service';

import { LanguageConfig } from '../shared/config/language.config';

@IonicPage()
@Component({
  selector: 'sg-detail',
  templateUrl: 'me-detail.component.html'
})
export class MeDetailComponent {

  languageType: string = localStorage.getItem('languageType');
  languageContent = LanguageConfig.MeDetailComponent[this.languageType];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private jmessage: JMessageService,
    private plugin: PluginService,
    private loadingCtrl: LoadingController,
    private meService: MeService,
    private barcodeScanner: BarcodeScanner,
    private camera: Camera
  ) { }

  user: any;
  base64Image: string;
  loading: Loading;

  ionViewDidLoad() {
    this.user = this.navParams.data.user;
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  async getNewPhoto(type: number, size: number) {
    let temp = await this.plugin.getNewPhoto(type, size);
    temp = 'data:image/jpeg;base64,' + temp;
    this.user.avatarUrl = temp;
    this.showLoading();
    await this.meService.setAvatar(this.user.id, temp);
    await this.meService.setLocalAvatar(this.user.username, temp);
    localStorage.setItem('currentUser', JSON.stringify(this.user));
    this.loading.dismiss();
    // this.user.avatarurl = await this.plugin.getNewPhoto(type, size);
    // if (!this.user.avatarurl) return;
    // this.showLoading();
    // console.log(this.user.avatarUrl);
    // await this.jmessage.updateMyAvatar(this.user.avatarUrl);
    // this.loading.dismiss();
  }
  changePhoto() {
    let actionSheet = this.actionSheetCtrl.create({
      title: this.languageContent.changePhotoActionTitle,
      buttons: [
        {
          text: this.languageContent.takePhoto,
          handler: () => {
            this.getNewPhoto(1, 400);
          }
        }, {
          text: this.languageContent.selectPhoto,
          handler: () => {
            this.getNewPhoto(0, 400);
          }
        }, {
          text: this.languageContent.cancel,
          role: this.languageContent.cancel,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  showQr(): void {
    // 从前端获取
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.plugin.setBarcode(user.username);
  }
}
