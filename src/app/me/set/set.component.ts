import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, App, Platform, IonicPage } from 'ionic-angular';

import { LoginComponent } from '../../login/login.component';
import { PatternLockComponent } from '../../login/pattern-lock/pattern-lock.component';
import { JMessageService } from '../../core/services/jmessage.service'
import { PluginService } from '../../core/services/plugin.service'

@IonicPage()
@Component({
  selector: 'sg-set',
  templateUrl: 'set.component.html'
})
export class SetComponent {

  isMoving:boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private jmessage: JMessageService,
    private plugin: PluginService,
    private app: App,
    private platform: Platform
  ) {
  }
  ionViewDidLoad() {
  }
  ionViewWillEnter() {

  }
  ionViewWillLeave() {

  }
  touchstart() {
    this.isMoving = false;
  }
  touchmove() {
    this.isMoving = true;
  }
  changeFont() {
    // localStorage.set('fontType','simple_Chinese');
    let alert = this.alertCtrl.create();
    alert.setTitle('语言版本选择');
    alert.addInput({
      type: 'radio',
      label: '简体中文',
      value: 'simple_Chinese',
      checked: localStorage.getItem('languageType') === 'simple_Chinese'
    });
    alert.addInput({
      type: 'radio',
      label: '繁体中文',
      value: 'traditional_Chinese',
      checked: localStorage.getItem('languageType') === 'traditional_Chinese'
    });

    alert.addButton('取消');
    alert.addButton({
      text: '确认',
      handler: (data: string) => {
        localStorage.setItem('languageType', data);
        this.plugin.showToast('已切换语言版本,重启可获得最佳体验')
      }
    });
    alert.present();
  }
  // 注销用户
  logout(): void {
    let that = this;
    let confirm = this.alertCtrl.create({
      title: '注销',
      message: '注销后将收不到推送消息，确认要退出吗?',
      buttons: [
        {
          text: '取消',
          handler: () => {

          }
        },
        {
          text: '确定',
          handler: () => {
            localStorage.removeItem('currentUser');
            that.jmessage.loginOut();
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
      title: '退出',
      message: '退出后将收不到推送消息，确认要退出吗?',
      buttons: [
        {
          text: '否',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '是',
          handler: () => {
            // that.jmessage.jmessageHandler.unsubscribe();
            that.jmessage.loginOut();
            that.platform.exitApp();
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
