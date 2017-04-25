import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Keyboard, IonicApp, MenuController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginComponent } from './login/login.component';
import { TabsComponent } from './tabs/tabs.component';
import { AttendanceComponent } from './application/my-modules/attendance/attendance.component'
import { PatternLockComponent } from './login/pattern-lock/pattern-lock.component';
import { MessageService } from './message/shared/service/message.service'

// test
import { BookCardComponent } from './application/my-modules/book-library/book-card/book-card.component';

declare var cordova: any;

@Component({
  templateUrl: 'app.html'
})
export class MyAppComponent {
  rootPage: any = LoginComponent;
  @ViewChild(Nav) nav: Nav;

  constructor(private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private keyboard: Keyboard,
    private ionicApp: IonicApp,
    private menuCtrl: MenuController,

    private messageservice: MessageService,
    private app: App
  ) {

    this.appInit();
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.messageservice.getContacts();
      this.messageservice.history = this.messageservice.getLocalMessageHistory() ? this.messageservice.getLocalMessageHistory() : [];
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
      // this.rootPage = BookCardComponent
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
      console.log(activeVC)
      if (activeVC.instance instanceof LoginComponent) {
        this.platform.exitApp();
      }
      if (activeVC.instance instanceof TabsComponent) {
        let tabs = activeVC.instance.tabRef;
        let activeNav = tabs.getSelected();
        if(activeNav.canGoBack()) {
          activeNav.pop();
        }else {
          cordova.plugins.backgroundMode.moveToBackground()
        }
        return;
      }
      if (activeVC.instance instanceof AttendanceComponent) {
        let tabs = activeVC.instance.attendance;
        let activeNav = tabs.getSelected();
        if(activeNav.canGoBack()) {
          activeNav.pop();
        }else {
          this.app.getRootNav().setRoot(TabsComponent);
        }
        return;
      }
      return;
    }, 1);
  }
}
