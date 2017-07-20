import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { TabsComponent } from '../tabs/tabs.component';
import { LoginService } from './shared/service/login.service';

@Component({
  selector: 'sg-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  constructor(
    public navCtrl: NavController,
    private loginService: LoginService
  ) {
  }
  appVersion: string;
  registerCredentials = { username: 'jinzhi.he', password: 'pass' };

  ionViewDidLoad() {
    this.appVersion = localStorage.getItem('appVersion');
    if (!localStorage.getItem('currentUser')) return;
    let user = JSON.parse(localStorage.getItem('currentUser'));
    ({ username: this.registerCredentials.username, password: this.registerCredentials.password } = user);
  }

  public async login() {
    let loginSuccess = await this.loginService.login(this.registerCredentials.username, this.registerCredentials.password);
    if (loginSuccess) {
      this.navCtrl.setRoot(TabsComponent);
    } else {
      return;
    }

  }
}
