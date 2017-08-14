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

  errMes: string
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
    this.errMes = '';
    this.user = this.navParams.data.user;
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  async getNewPhoto(type: number, size: number) {
    if (!this.plugin.isCordova()) return;
    let temp = await this.plugin.getNewPhoto(type, size).catch((e) => console.log(e));
    if(!temp) return;
    temp = 'data:image/jpeg;base64,' + temp;
    this.user.avatarUrl = temp;
    this.showLoading();
    await this.meService.setAvatar(temp).catch((err) => {
      console.log(err);
      this.plugin.errorDeal(err);
    });
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
    this.plugin.setBarcode(this.user.username);
  }

  changeDetailRequest(type: number) {
    let title = '';
    type = Number(type);
    switch (type) {
      case 1:
        title = '修改手机号码';
        break;
      case 2:
        title = '修改固话号码';
        break;
      case 3:
        title = '修改邮箱地址';
        break;
      default:
        break;
    }

    let prompt = this.plugin.getAlert().create({
      title: title,
      inputs: [
        {
          name: 'del',
          placeholder: ''
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
          }
        },
        {
          text: '修改',
          handler: data => {
            if (!this.validate(type, data.del)) return;
            this.toChangeDetail(type, data.del);
          }
        }
      ]
    });
    prompt.present();
  }
  toChangeDetail(type: number, newData: string) {
    switch (type) {
      case 1:
        this.meService.changeMobile(newData).then((res) => {
          if (Number(res.status) === 200) {
            this.user.mobile = newData;
            this.updataSucc();
          }
        }).catch((err) => {
          console.log(err);
          this.plugin.errorDeal(err);
        })
        break;
      case 2:
        this.meService.changeTele(newData).then((res) => {
          if (Number(res.status) === 200) {
            this.user.telephone = newData;
            this.updataSucc();
          }
        }).catch((err) => {
          console.log(err);
          this.plugin.errorDeal(err);
        })
        break;
      case 3:
        this.meService.changeMobile(newData).then((res) => {
          if (Number(res.status) === 200) {
            this.user.email = newData;
            this.updataSucc();
          }
        }).catch((err) => {
          console.log(err);
          this.plugin.errorDeal(err);
        })
        break;
      default:
        break;
    }
  }
  updataSucc() {
    this.updateUser();
    this.plugin.showToast('修改成功')
  }
  updateUser() {
    localStorage.setItem('currentUser', JSON.stringify(this.user))
  }
  isSame() {
    this.plugin.showToast('与原资料一致,不需要修改');
  }
  validate(type: number, newData: string) {
    let res = false;
    switch (type) {
      case 1:
        if (newData === this.user.mobile) {
          this.isSame();
          return;
        }
        res = /^1\d{10}$/.test(newData);
        this.errMes = res ? '' : newData + ': ' + '不是正确的手机号码';
        break;
      case 2:
        if (newData === this.user.telephone) {
          this.isSame();
          return;
        }
        res = /^\d{4}\-\d{8}$/.test(newData) || /^\d{4}$/.test(newData);
        this.errMes = res ? '' : newData + ': ' + '不是正确的固话号码或短号';
        break;
      case 3:
        if (newData === this.user.email) {
          this.isSame();
          return;
        }
        res = /^([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]*)*\@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])*/.test(newData);
        this.errMes = res ? '' : newData + ': ' + '不是正确的邮箱地址';
        break;
      default:
        break;
    }
    return res;
  }
}
