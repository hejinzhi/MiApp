import { Component, ViewChild, enableProdMode } from '@angular/core';
import { Platform, Nav, Keyboard, IonicApp, MenuController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginComponent } from './login/login.component';
import { TabsComponent } from './tabs/tabs.component';
import { PatternLockComponent } from './login/pattern-lock/pattern-lock.component';
import { MessageService } from './message/shared/service/message.service';

import { PluginService } from './core/services/plugin.service';
import { JMessageService } from './core/services/jmessage.service';
import { JPushService } from './core/services/jpush.service'

import { OrganizationComponent } from './contact/organization/organization.component';

declare var cordova: any;

@Component({
  templateUrl: 'app.html'
})
export class MyAppComponent {
  rootPage: any = LoginComponent;
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  @ViewChild(Nav) nav: Nav;

  constructor(private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private keyboard: Keyboard,
    private ionicApp: IonicApp,
    private menuCtrl: MenuController,
    private jMessage: JMessageService,
    private messageservice: MessageService,
    private plugin: PluginService,
    private app: App,
    private jPushService: JPushService,
    private jmessageService: JMessageService
  ) {

    // if (platform.is('cordova')) {
    //   enableProdMode();
    // }

    this.appInit();
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.jMessage.jmessagePlugin = (<any>window).plugins ? (<any>window).plugins.jmessagePlugin || null : null;
      this.jPushService.jPushPlugin = (<any>window).plugins ? (<any>window).plugins.jPushPlugin || null : null;
      this.loginJmes();
      if (platform.is('android')) {
        this.plugin.checkAppForUpdate();
        let original = platform.runBackButtonAction;
        let __this = this;
        platform.runBackButtonAction = function (): void {
          if (__this.keyboard.isOpen()) {//如果键盘开启则隐藏键盘
            __this.keyboard.close();
            return;
          }
          let activePortal = __this.ionicApp._toastPortal.getActive()
            || __this.ionicApp._loadingPortal.getActive()
            || __this.ionicApp._overlayPortal.getActive()
            || __this.ionicApp._modalPortal.getActive();
          if (activePortal) {
            activePortal.dismiss();
            return;
          }
          let activeVC = __this.nav.getActive();
          if (activeVC.instance instanceof LoginComponent) {
            platform.exitApp();
          } else if (activeVC.instance instanceof PatternLockComponent) {
            platform.exitApp();
          } else {
            let tabs = activeVC.instance.tabRef;
            let activeNav = tabs.getSelected();
            return activeNav.canGoBack() ? original.apply(platform) : cordova.plugins.backgroundMode.moveToBackground();
          }
        }
      }
    });
  }
  async loginJmes() {
    if (this.plugin.isCordova()) {
      let user = JSON.parse(localStorage.getItem('currentUser'));
      let jmessageLogin = await this.jmessageService.autoLogin(user.username, 'pass');
      if (!jmessageLogin) {
        this.plugin.showToast('Jmessage Login Error: ' + jmessageLogin);
        return;
      };
    }
  }
  appInit() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.myNineCode) {
      // 已经有用户信息和设定为要验证手势密码
      this.rootPage = PatternLockComponent;
      // this.rootPage = OrganizationComponent;
    } else if(user){
      this.rootPage = TabsComponent;
    }else {
      this.rootPage = LoginComponent;
      // this.rootPage = OrganizationComponent;
    }
    if (!localStorage.getItem('languageType')) {
      localStorage.setItem('languageType', 'simple_Chinese');
    }
  }



  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      if (this.keyboard.isOpen()) {//如果键盘开启则隐藏键盘
        this.keyboard.close();
        return;
      }
      if (this.menuCtrl.isOpen()) {//如果侧边菜单栏打开就关闭
        this.menuCtrl.close();
        return;
      }
      //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
      let activePortal = this.ionicApp._toastPortal.getActive()
        || this.ionicApp._loadingPortal.getActive()
        || this.ionicApp._overlayPortal.getActive()
        || this.ionicApp._modalPortal.getActive();
      if (activePortal) {
        activePortal.dismiss();
        return;
      }
      let activeVC = this.nav.getActive();
      console.log(activeVC);

      if (activeVC.instance instanceof LoginComponent) {
        this.platform.exitApp();
      } else if (activeVC.instance instanceof PatternLockComponent) {
        this.platform.exitApp();
      } else {
        let tabs = activeVC.instance.tabRef;
        let activeNav = tabs.getSelected();
        console.log(activeNav);
        return activeNav.canGoBack() ? activeNav.pop() : cordova.plugins.backgroundMode.moveToBackground();
      }
    }, 1);
  }

  //双击退出功能模块并返回主界面
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则返回主界面
      this.app.getRootNav().setRoot(TabsComponent);
    } else {
      this.backButtonPressed = true;
      this.plugin.showToast('再按一次返回主界面');
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }
}
