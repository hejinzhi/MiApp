
import { Subscription } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams, AlertController, App, Platform, IonicPage } from 'ionic-angular';

import { LoginComponent } from '../../login/login.component';
import { PatternLockComponent } from '../../login/pattern-lock/pattern-lock.component';
import { JMessageService } from '../../core/services/jmessage.service';
import { PluginService } from '../../core/services/plugin.service';
import { TranslateService } from '@ngx-translate/core';
import { MeService } from '../shared/service/me.service';

import { UserState } from './../../shared/models/user.model';
import { User_Logout, User_Update } from './../../shared/actions/user.action';
import { MyStore } from './../../shared/store';
import { EnvConfig } from '../../shared/config/env.config';
import { CommonService } from './../../core/services/common.service';

@IonicPage()
@Component({
  selector: 'sg-set',
  templateUrl: 'set.component.html'
})
export class SetComponent implements OnInit, OnDestroy {

  plf: string; // 判断是什么平台
  translateTexts: any;
  user: UserState
  mysubscription: Subscription
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private jmessage: JMessageService,
    private plugin: PluginService,
    private app: App,
    private platform: Platform,
    private translate: TranslateService,
    private meService: MeService,
    private store$: Store<MyStore>,
    private commonService: CommonService
  ) {
    if (this.platform.is('ios')) {
      this.plf = 'ios';
    } else if (this.platform.is('android')) {
      this.plf = 'android';
    }
  }
  ngOnInit() {
    this.mysubscription = this.store$.select('userReducer').subscribe((user: UserState) => this.user = user);
    this.translate.stream(['meComponent.languageChangeAlertTitle', 'meComponent.zh-CN', 'meComponent.zh-TW', 'cancel', 'confirm'
      , 'meComponent.reStartAppAlertTitle', 'meComponent.reStartAppAlertMes', 'meComponent.logoutAlertTitle', 'meComponent.logoutAlertMes'
      , 'meComponent.exitAlertTitle', 'meComponent.exitAlertMes', 'Y', 'N', 'change_to', 'meComponent.companyChangeAlertTitle']).subscribe((res) => {
        this.translateTexts = res;
      })
  }

  ngOnDestroy() {
    this.mysubscription.unsubscribe();
  }

  checkUpdate() {
    this.plugin.checkAppForUpdate(false);
  }

  changeFont() {
    let that = this;
    let alert = this.alertCtrl.create();
    let lang = this.translate.currentLang ? this.translate.currentLang.toUpperCase() : 'ZH-TW';
    alert.setTitle(this.translateTexts['meComponent.languageChangeAlertTitle']);
    alert.addInput({
      type: 'radio',
      label: this.translateTexts['meComponent.zh-CN'],
      value: 'zh-CN',
      checked: lang === 'ZH-CN'
    });
    alert.addInput({
      type: 'radio',
      label: this.translateTexts['meComponent.zh-TW'],
      value: 'zh-TW',
      checked: lang === 'ZH-TW'
    });

    alert.addButton(this.translateTexts['cancel']);
    alert.addButton({
      text: this.translateTexts['confirm'],
      handler: (data: string) => {
        this.translate.use(data);
        this.store$.dispatch(new User_Update({ preferLang: data }))
        this.plugin.showToast(this.translateTexts['change_to'] + this.translateTexts['meComponent.' + data])
      }
    });
    alert.present();
  }

  changeCompany() {
    let that = this;
    let alert = this.alertCtrl.create();
    let companyid = localStorage.getItem('appCompanyId');
    alert.setTitle(this.translateTexts['meComponent.companyChangeAlertTitle']);
    this.user.companys.forEach((company: any) => {
      alert.addInput({
        type: 'radio',
        label: this.commonService.chineseConv(company.COMPANY_CNAME),
        value: company.COMPANY_ID,
        checked: companyid === company.COMPANY_ID
      });
    });
    alert.addButton(this.translateTexts['cancel']);
    alert.addButton({
      text: this.translateTexts['confirm'],
      handler: (data: string) => {
        EnvConfig.companyID = data;
        localStorage.setItem('appCompanyId', data);
        this.meService.getUserInfo(this.user.empno, data).then((user: any) => {
          let res = user.json();
          if (res[0]) {
            this.user.department = user.json()[0].DEPT_NAME;
            this.user.position = user.json()[0].JOB_TITLE;
            this.store$.dispatch(new User_Update(this.user))
          }
        });
        this.plugin.showToast(this.translateTexts['change_to'] + data)
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
            this.store$.dispatch(new User_Logout())
            this.app.getRootNav().setRoot(LoginComponent);
          }
        }
      ]
    });
    confirm.present();
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
