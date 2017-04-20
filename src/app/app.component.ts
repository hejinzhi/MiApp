import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Keyboard, IonicApp, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginComponent } from './login/login.component';
import { PatternLockComponent } from './login/pattern-lock/pattern-lock.component';
import { MessageService } from './message/shared/service/message.service'

declare var cordova: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginComponent;
  @ViewChild(Nav) nav: Nav;

  constructor(private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private keyboard: Keyboard,
    private ionicApp: IonicApp,
    private menuCtrl: MenuController,
    private messageservice: MessageService) {

    this.appInit();
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.messageservice.getContacts();
      this.messageservice.history =this.messageservice.getLocalMessageHistory()? this.messageservice.getLocalMessageHistory() : [];
    });
    this.registerBackButtonAction();
  }


  appInit() {
    //第一次安装app后设置手势密码页面为登录验证
    if (!localStorage.getItem('needPassNineCode')) {
      localStorage.setItem('needPassNineCode', 'true');
    }

    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && (localStorage.getItem('needPassNineCode') == 'true')) {
      // 已经有用户信息和设定为要验证手势密码
      this.rootPage = PatternLockComponent;
    } else {
      this.rootPage = LoginComponent;
    }

    if (localStorage.getItem('toValiPassword')) {
      localStorage.removeItem('toValiPassword')
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
      if (activeVC.instance instanceof LoginComponent) {
        this.platform.exitApp();
      }
      let tabs = activeVC.instance.tabRef;
      let activeNav = tabs.getSelected();
      return activeNav.canGoBack() ? activeNav.pop() : cordova.plugins.backgroundMode.moveToBackground();
    }, 1);
  }
}
