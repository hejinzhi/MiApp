import { Component, OnInit } from '@angular/core';
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
export class SetComponent implements OnInit {

  languageType: string = localStorage.getItem('languageType');
  languageContent = LanguageConfig.setComponent[this.languageType];
  plf: string; // 判断是什么平台
  translateTexts: any;

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
  ngOnInit() {
    this.translate.get(['meComponent.languageChangeAlertTitle', 'meComponent.simple_Chinese', 'meComponent.traditional_Chinese', 'cancel', 'confirm'
      , 'meComponent.reStartAppAlertTitle', 'meComponent.reStartAppAlertMes', 'meComponent.logoutAlertTitle', 'meComponent.logoutAlertMes'
      , 'meComponent.exitAlertTitle', 'meComponent.exitAlertMes', 'Y', 'N']).subscribe((res) => {
        this.translateTexts = res;
      })

    this.translate.onLangChange.subscribe(() => {
      this.translate.get(['meComponent.languageChangeAlertTitle', 'meComponent.simple_Chinese', 'meComponent.traditional_Chinese', 'cancel', 'confirm'
        , 'meComponent.reStartAppAlertTitle', 'meComponent.reStartAppAlertMes', 'meComponent.logoutAlertTitle', 'meComponent.logoutAlertMes'
        , 'meComponent.exitAlertTitle', 'meComponent.exitAlertMes', 'Y', 'N']).subscribe((res) => {
          this.translateTexts = res;
        })
    });
  }

  checkUpdate() {
    this.plugin.checkAppForUpdate(false);
  }

  changeFont() {
    let that = this;
    let alert = this.alertCtrl.create();
    let lang = this.translate.currentLang?this.translate.currentLang.toUpperCase():'ZH-TW';
    alert.setTitle(this.translateTexts['meComponent.languageChangeAlertTitle']);
    alert.addInput({
      type: 'radio',
      label: this.translateTexts['meComponent.simple_Chinese'],
      value: 'zh-CN',
      checked: lang === 'ZH-CN'
    });
    alert.addInput({
      type: 'radio',
      label: this.translateTexts['meComponent.traditional_Chinese'],
      value: 'zh-TW',
      checked: lang === 'ZH-TW'
    });

    alert.addButton(this.translateTexts['cancel']);
    alert.addButton({
      text: this.translateTexts['confirm'],
      handler: (data: string) => {
        this.translate.use(data);
        localStorage.setItem('preferLang',data);
        this.plugin.showToast('已更改为'+data)
      }
    });
    alert.present();
  }
  reStartApp() {
    let confirm = this.alertCtrl.create({
      title: this.translateTexts['meComponent.reStartAppAlertTitle'],
      message: this.translateTexts['meComponent.reStartAppAlertMes'],
      buttons: [
        {
          text: this.translateTexts['cancel'],
          handler: () => {

          }
        },
        {
          text: this.translateTexts['confirm'],
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
      title: this.translateTexts['meComponent.logoutAlertTitle'],
      message: this.translateTexts['meComponent.logoutAlertMes'],
      buttons: [
        {
          text: this.translateTexts['cancel'],
          handler: () => {

          }
        },
        {
          text: this.translateTexts['confirm'],
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
      title: this.translateTexts['meComponent.exitAlertTitle'],
      message: this.translateTexts['meComponent.exitAlertMes'],
      buttons: [
        {
          text: this.translateTexts['N'],
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: this.translateTexts['Y'],
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
