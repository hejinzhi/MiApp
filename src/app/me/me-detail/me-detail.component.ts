import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { JMessageService } from '../../core/services/jmessage.service'
// import { DataService } from '../../services/data.service';
import { PluginService } from '../../core/services/plugin.service';

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
    // private dataService: DataService,
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
    this.user.avatarurl = await this.plugin.getNewPhoto(type, size).catch((err) =>{
      console.log(err)
    });
    if(!this.user.avatarurl) return;
    this.showLoading();
    await this.jmessage.updateMyAvatar(this.user.avatarUrl);
    this.loading.dismiss();
  }
  changePhoto() {
    let actionSheet = this.actionSheetCtrl.create({
      title: this.languageContent.changePhotoActionTitle,
      buttons: [
        {
          text: this.languageContent.takePhoto,
          handler: () => {
            this.getNewPhoto(1,800);
          }
        }, {
          text: this.languageContent.selectPhoto,
          handler: () => {
            this.getNewPhoto(0,800);
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

  showQr():void {
    // 从前端获取
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.plugin.setBarcode(user.username);
  }
}
