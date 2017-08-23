import { Injectable } from '@angular/core';
import { Platform, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CodePush } from '@ionic-native/code-push';
import { Network } from '@ionic-native/network';
import { SyncStatus } from 'ionic-native';
import { tify, sify } from 'chinese-conv';

@Injectable()
export class PluginService {
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private barcodeScanner: BarcodeScanner,
    private camera: Camera,
    private codePush: CodePush,
    private network: Network,
    private platform: Platform
  ) { }

  appNewVersion:string = '';
  chineseConv(value: string) {
    let fontType: string = localStorage.getItem('languageType');
    switch (fontType) {
      case 'simple_Chinese':
        return sify(JSON.stringify(value)).replace(/^\"/g, '').replace(/\"$/g, '');
      case 'traditional_Chinese':
        return tify(JSON.stringify(value)).replace(/^\"/g, '').replace(/\"$/g, '');
      default:
        return value;
    }
  }
  getAlert() {
    return this.alertCtrl;
  }
  getCodePush() {
    return this.codePush;
  }
  isCordova() {
    return this.platform.is('cordova');
  }
  isWifi() {
    return this.network.type === 'wifi';
  }
  confirmUpdate() {
    this.codePush.notifyApplicationReady().then(() => {
      if (!localStorage.getItem('showConfirmUpdate') || localStorage.getItem('showConfirmUpdate') == '0') return;
      const alert = this.alertCtrl.create({
        title: this.chineseConv('已更新成功'),
        buttons: ['OK']
      });
      alert.present();
      this.showConfirmUpdate('0');
    })
  }
  showConfirmUpdate(ss: string) {
    // '1' show '0' not show
    localStorage.setItem('showConfirmUpdate', ss);
  }
  codePushSync() {
    this.codePush.sync().subscribe((syncStatus) => {
      console.log('Sync Status1: ', syncStatus);
      if (syncStatus === SyncStatus.UP_TO_DATE) {
      }
      switch (syncStatus) {
        case SyncStatus.IN_PROGRESS:
          break;
        case SyncStatus.CHECKING_FOR_UPDATE:
          break;
        case SyncStatus.DOWNLOADING_PACKAGE:
          break;
        case SyncStatus.INSTALLING_UPDATE:
          break;
        case SyncStatus.UPDATE_INSTALLED:
          this.showConfirmUpdate('1');
          this.updateAppVersion(this.appNewVersion);
          let confirm = this.alertCtrl.create({
            title: this.chineseConv(`更新成功`),
            message: this.chineseConv(`马上重启应用体验最新版本?`),
            buttons: [
              {
                text: this.chineseConv('取消'),
                handler: () => {

                }
              },
              {
                text: this.chineseConv('确定'),
                handler: () => {
                  this.codePush.restartApplication();
                }
              }
            ]
          });
          confirm.present();
          break;
        case SyncStatus.ERROR:
          this.showToast(this.chineseConv('更新失败,请稍后重试'))
          break;
        default:
          break;
      }
    });
  }
  updateAppVersion(v:string) {
    localStorage.setItem('appVersion',v);
  }
  checkAppForUpdate(auto: boolean = true) {
    if (!this.isCordova()) return;
    return this.codePush.checkForUpdate().then((apk) => {
      if (!apk) {
        this.confirmUpdate();
        if (!auto) {
          this.showToast(this.chineseConv('已经是最新版本'))
        }
        return;
      };
      let des = apk.description.split('&&');
      if(des.length>1){
        this.appNewVersion = des[0];
      }
      let confirm = this.alertCtrl.create({
        title: this.chineseConv(`检测到应用有更新,是否升级`),
        subTitle: this.chineseConv(`更新内容: ${des[des.length-1]}`),
        message: this.chineseConv(`应用大小: ${(apk.packageSize / Math.pow(1024, 2)).toFixed(2)}M`),
        buttons: [
          {
            text: this.chineseConv('取消'),
            handler: () => {

            }
          },
          {
            text: this.chineseConv('确定'),
            handler: () => {
              this.confirmWifiTodo(this.codePushSync)
            }
          }
        ]
      });
      confirm.present();
    }).catch((err) => {
      console.log(err)
    })
  }
  confirmWifiTodo(todo: any) {
    if (!this.isWifi()) {
      let confirm = this.alertCtrl.create({
        title: this.chineseConv(`警告`),
        message: this.chineseConv(`目前不是在WIFI网络,是否继续下载操作`),
        buttons: [
          {
            text: this.chineseConv('取消'),
            handler: () => {

            }
          },
          {
            text: this.chineseConv('确定'),
            handler: () => {
              todo.call(this);
            }
          }
        ]
      });
      confirm.present();
    } else {
      todo.call(this);
    }
  }
  setBarcode(content: string) {
    this.barcodeScanner.encode('TEXT_TYPE', content).then((res) => {
    }, (err) => {
      console.log(err)
    })
  }
  getBarcode(): Promise<void> {
    return this.barcodeScanner.scan().then((barcodeData) => {
      Promise.resolve(barcodeData)
    }, (err) => {
      Promise.reject(err)
    });
  }

  createBasicAlert(subText: string) {
    let alert = this.alertCtrl.create({
      title: this.chineseConv('错误'),
      subTitle: subText,
      buttons: [this.chineseConv('确定')]
    });
    alert.present();
  }
  getNewPhoto(type: number, size: number,opts:any={}): Promise<any> {
    let options: CameraOptions = {
      //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
      quality: 50,                                            //相片质量0-100
      allowEdit: true,                                         //在选择之前允许修改截图
      destinationType: this.camera.DestinationType.DATA_URL, //DATA_URL : 0, Return image as base64-encoded string, FILE_URI : 1, Return image file URI, NATIVE_URI : 2 Return image native URI (e.g., assets-library:// on iOS or content:// on Android)
      sourceType: type,                                         //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
      encodingType: this.camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
      targetWidth: size,                                        //照片宽度
      targetHeight: size,                                       //照片高度
      mediaType: 0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
      cameraDirection: 0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
      saveToPhotoAlbum: false                                   //保存进手机相册
    };
    options = Object.assign(options,opts);
    // return this.camera.getPicture(options).then((imageData) => {
    //   return Promise.resolve(imageData);
    // }, (err) => {
    //   return Promise.reject(err);
    // });
    return this.camera.getPicture(options);
  }

  showToast(content: string, position: string = 'top', duration: number = 2000) {
    this.toastCtrl.create({
      message: content,
      duration: duration,
      position: position
    }).present()
  }

  createLoading(content: string = 'Please wait...') {
    return this.loadingCtrl.create({
      content: content
    });
  }

  errorDeal(err: any, showAlert: boolean = false) {
    let errTip = '';
    switch (err.status) {
      case 404:
        this.showToast(this.chineseConv('未找到结果'));
        break;
      case 400:
        let errMes:string = ''
        try{
          errMes = err.json().ExceptionMessage;
        }catch(e){
          console.log(e)
          errMes = err._body;
        }
        errTip = this.chineseConv(errMes);
        break;
      case 0:
        this.showToast(this.chineseConv('连接服务器失败'));
        break;
      case 500:
        this.showToast(this.chineseConv('服务器没响应'));
        break;
      default:
        this.showToast(this.chineseConv('出现未定义连接错误') + err.status);
        break;
    }
    return errTip
  }
}
