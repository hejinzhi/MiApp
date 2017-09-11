import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { TabsComponent } from '../tabs/tabs.component';
import { LoginService } from './shared/service/login.service';
import { JMessageService } from '../core/services/jmessage.service';

import { MyStore } from './../shared/store';
import { UserState } from './../shared/models/user.model';

declare var window: any;

@Component({
  selector: 'sg-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  constructor(
    public navCtrl: NavController,
    private loginService: LoginService,
    private jmessageService: JMessageService,
    private store$: Store<MyStore>
  ) {
  }
  appVersion: string;
  registerCredentials = { username: '', password: '', rememberPWD: false, autoLogin: false };

  ionViewDidLoad() {
    this.store$.select('userReducer').subscribe((user:UserState) => {
      if(user.nickname) {
        this.registerCredentials = Object.assign(this.registerCredentials, user);
      }
    });
    this.appVersion = localStorage.getItem('appVersion');
  }

  check1() {
    if(!this.registerCredentials.rememberPWD) {
      this.registerCredentials.autoLogin = false;
    }
  }

  check2() {
    if(this.registerCredentials.autoLogin) {
      this.registerCredentials.rememberPWD = true;
    }
  }

  public async login() {
    let loginSuccess = await this.loginService.login(this.registerCredentials.username, this.registerCredentials.password,{
      rememberPWD: this.registerCredentials.rememberPWD, autoLogin: this.registerCredentials.autoLogin
    });
    if (loginSuccess) {
      this.navCtrl.setRoot(TabsComponent);
    } else {
      return;
    }
    // console.log(window.JMessage);
    // console.log(this.jmessageService.jmessagePlugin);
    // this.jmessageService.init();

  }


}
