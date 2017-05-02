import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';

import { MyHttpService } from '../core/services/myHttp.service';
import { JMessageService } from '../core/services/jmessage.service';
import { UserModel } from '../shared/models/user.model';
import { LoginConfig } from './shared/config/login.config';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'sg-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private myHttp: MyHttpService,
    private jmessageService: JMessageService,
  ) {

  }

  loading: Loading;
  registerCredentials = { username: 'jinzhi.he', password: 'pass' };
  currentUser: UserModel;

  public async login() {
    this.showLoading();
    if (this.registerCredentials.username === null || this.registerCredentials.password === null) {
      this.showError("Please insert credentials");
    } else {
      this.currentUser = new UserModel(this.registerCredentials.username, this.registerCredentials.password);
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      let res;
      try {
        res = await this.myHttp.post(LoginConfig.loginUrl, { userName: this.registerCredentials.username, password: this.registerCredentials.password });
        // let jmessageLogin = await this.jmessageService.login(this.registerCredentials.username, this.registerCredentials.password);
        // if (!(jmessageLogin === 'OK')) {
        //   this.showError('Jmessage Login Error: ' + jmessageLogin);
        //   return;
        // };
        let token = res.json().Token;
        if (token) {
          this.currentUser.avatarUrl = res.json().User.AVATAR_URL;
          this.currentUser.nickname = res.json().User.NICK_NAME;
          this.currentUser.position = res.json().User.JOB_TITLE;
          this.currentUser.department = res.json().User.DEPT_NAME;
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          this.loading.dismiss();
          this.navCtrl.setRoot(TabsComponent);
        } else {
          this.showError("Get Token Error");
        }
      }
      catch (err) {
        this.showError(err._body);
      }
    }
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text: string) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  async test() {
  }

  test2() {
    let token = localStorage.getItem('access_token');
    console.log(token);
  }

}
