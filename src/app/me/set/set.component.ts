import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, App, Platform, IonicPage } from 'ionic-angular';

import { LoginComponent } from '../../login/login.component';
import { PatternLockComponent } from '../../login/pattern-lock/pattern-lock.component';
import { JMessageService } from '../../core/services/jmessage.service';
import { PluginService } from '../../core/services/plugin.service';
import { TranslateService } from '@ngx-translate/core';

import { LanguageConfig } from '../shared/config/language.config';

@IonicPage()
@Component({
  selector: 'sg-set',
  templateUrl: 'set.component.html'
})
export class SetComponent {

  languageType: string = localStorage.getItem('languageType');
  languageContent = LanguageConfig.setComponent[this.languageType];
  plf: string; // 判断是什么平台

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private jmessage: JMessageService,
    private plugin: PluginService,
    private app: App,
    private platform: Platform,
    private translate: TranslateService
  ) {
    if (this.platform.is('ios')) {
      this.plf = 'ios';
    } else if (this.platform.is('android')) {
      this.plf = 'android';
    }
  }


  checkUpdate() {
    this.plugin.checkAppForUpdate(false);
  }

  changeFont() {
    let that = this;
    let alert = this.alertCtrl.create();
    let lang = this.translate.currentLang.toUpperCase();
    alert.setTitle(this.languageContent.languageChangeAlertTitle);
    alert.addInput({
      type: 'radio',
      label: this.languageContent.simple_Chinese,
      value: 'zh-CN',
      checked: lang === 'ZH-CN'
    });
    alert.addInput({
      type: 'radio',
      label: this.languageContent.traditional_Chinese,
      value: 'zh-TW',
      checked: lang === 'ZH-TW'
    });

    alert.addButton(this.languageContent.cancel);
    alert.addButton({
      text: this.languageContent.confirm,
      handler: (data: string) => {
        this.translate.use(data);
        this.plugin.showToast('已更改为'+data)
      }
    });
    alert.present();
  }
  reStartApp() {
    let confirm = this.alertCtrl.create({
      title: this.languageContent.reStartAppAlertTitle,
      message: this.languageContent.reStartAppAlertMes,
      buttons: [
        {
          text: this.languageContent.cancel,
          handler: () => {

          }
        },
        {
          text: this.languageContent.confirm,
          handler: () => {
            this.plugin.getCodePush().restartApplication();
          }
        }
      ]
    });
    confirm.present();
  }
  // 注销用户
  logout(): void {
    let that = this;
    let confirm = this.alertCtrl.create({
      title: this.languageContent.logoutAlertTitle,
      message: this.languageContent.logoutAlertMes,
      buttons: [
        {
          text: this.languageContent.cancel,
          handler: () => {

          }
        },
        {
          text: this.languageContent.confirm,
          handler: () => {
            if (this.plugin.isCordova()) {
              // if (that.jmessage.jmessageHandler) {
              //   that.jmessage.jmessageHandler.unsubscribe();
              // }
              // if (that.jmessage.jmessageOffline) {
              //   that.jmessage.jmessageOffline.unsubscribe();
              // }
              that.jmessage.removeReceiveMessageListener();
              that.jmessage.removeSyncOfflineMessageListener();
              that.jmessage.loginOut();
            }
            this.removeAutoLogin();
            // localStorage.removeItem('currentUser');
            this.app.getRootNav().setRoot(LoginComponent);
          }
        }
      ]
    });
    confirm.present();
  }
  removeAutoLogin() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    user.autoLogin = false;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  exit() {
    let that = this;
    let confirm = this.alertCtrl.create({
      title: this.languageContent.exitAlertTitle,
      message: this.languageContent.exitAlertMes,
      buttons: [
        {
          text: this.languageContent.N,
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: this.languageContent.Y,
          handler: () => {
            // if (that.jmessage.jmessageHandler) {
            //   that.jmessage.jmessageHandler.unsubscribe();
            // }
            // if (that.jmessage.jmessageOffline) {
            //   that.jmessage.jmessageOffline.unsubscribe();
            // }
            that.jmessage.loginOut();
            if (that.platform.is('android')) {
              that.platform.exitApp();
            }
          }
        }
      ]
    });
    confirm.present();
  }
  // 到手势密码修改
  toNineCode(): void {
    this.navCtrl.push(PatternLockComponent, {
      reset: true
    });
  }
}
