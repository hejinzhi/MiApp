import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, App, Platform } from 'ionic-angular';
import { PatternLockComponent }  from '../../login/pattern-lock/pattern-lock.component';
import { LoginComponent } from '../../login/login.component';
import { JMessageService } from '../../core/services/jmessage.service'

@Component({
  selector: 'sg-set',
  templateUrl: 'set.component.html'
})
export class SetComponent {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private jmessage: JMessageService,
    private app : App,
    private platform: Platform
  ) {
  }
  ionViewDidLoad() {
  }
  ionViewWillEnter() {

  }
  ionViewWillLeave() {

  }

  // 注销用户
  logout():void {
    let confirm = this.alertCtrl.create({
      title: '确定退出',
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
            localStorage.removeItem('myNineCode');
            localStorage.setItem('needPassNineCode','true');
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
            that.jmessage.jmessageHandler.unsubscribe();
            that.jmessage.loginOut();
            that.platform.exitApp();
          }
        }
      ]
    });
    confirm.present();
  }
  // 到手势密码修改
  toNineCode():void {
    this.navCtrl.push(PatternLockComponent,{
      reset:true
    });
  }
}
