import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, LoadingController, Loading } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { JMessageService } from '../../core/services/jmessage.service'
// import { DataService } from '../../services/data.service';
import { PluginService } from '../../core/services/plugin.service';

@Component({
  selector: 'sg-detail',
  templateUrl: 'me-detail.component.html'
})
export class MeDetailComponent {

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
      title: '更换头像',
      buttons: [
        {
          text: '拍照',
          handler: () => {
            this.getNewPhoto(1,800);
          }
        }, {
          text: '从相册选择',
          handler: () => {
            this.getNewPhoto(0,800);
          }
        }, {
          text: '取消',
          role: '取消',
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
