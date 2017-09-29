import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Loading } from 'ionic-angular';

import { UserModel } from '../../../shared/models/user.model';
import { MyHttpService } from '../../../core/services/myHttp.service';
import { JMessageService } from '../../../core/services/jmessage.service';
import { PluginService } from '../../../core/services/plugin.service';
import { LoginConfig } from '../../shared/config/login.config';
import { DatabaseService } from '../../../message/shared/service/database.service';
import { EncryptUtilService } from '../../../core/services/encryptUtil.service';
import { MyStore } from './../../../shared/store';
import { User_Login, User_Update } from './../../../shared/actions/user.action';
import { EnvConfig } from '../../../shared/config/env.config';

@Injectable()
export class LoginService {
    currentUser: UserModel;
    loading: Loading;
    constructor(
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private myHttp: MyHttpService,
        private jmessageService: JMessageService,
        private pluginService: PluginService,
        private messageDatabaseService: DatabaseService,
        private encryptUtilService: EncryptUtilService,
        private store$: Store<MyStore>
    ) {

    }


    public async login(username: string, password: string, extra?: any) {
        this.showLoading();
        let ADLoginSuccess = await this.myADLogin(username, password, false, extra);
        if (ADLoginSuccess) {
            let jMsgLoginSuccess = await this.jMessageLogin(username, password, false);
            if (jMsgLoginSuccess) {
                this.loading.dismiss();
                return true;
            } else {
                this.loading.dismiss();
                return false;
            }
        } else {
            this.loading.dismiss();
            return false;
        }
    }

    async jMessageLogin(username: string, password: string, noErrorMsg: boolean = true) {
        if (this.pluginService.isCordova()) {
            let jmessageLogin = await this.jmessageService.autoLogin(username, 'pass');
            if (!jmessageLogin) {
                if (!noErrorMsg) {
                    this.showError('Jmessage Login Error: ' + jmessageLogin);
                }
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    async myADLogin(username: string, password: string, noErrorMsg: boolean = true, extra?: any) {
        this.currentUser = new UserModel(username, password);
        this.currentUser = Object.assign(this.currentUser, extra);
        this.store$.dispatch(new User_Update(this.currentUser))
        let res;
        try {
            let enUsername = this.encryptUtilService.AesEncrypt(username, this.encryptUtilService.key, this.encryptUtilService.iv);
            let enPassword = this.encryptUtilService.AesEncrypt(password, this.encryptUtilService.key, this.encryptUtilService.iv);
            // res = await this.myHttp.post(LoginConfig.loginUrl, { userName: username, password: password }, true);
            res = await this.myHttp.post(LoginConfig.loginUrl, { userName: enUsername, password: enPassword }, true);
        }
        catch (err) {
            if (!noErrorMsg) {
                this.showError('Username or password error,please try again.');
            }

            return false;
        }
        let token = res.json().Token;
        if (token) {
            let user = res.json().User;
            let companys = res.json().Companys;
            this.currentUser.id = user.ID;
            this.currentUser.companyId = user.COMPANY_ID;
            this.currentUser.companys = companys;
            if (user.AVATAR_URL.substr(0, 6) === 'Images') {
                this.currentUser.avatarUrl = EnvConfig.baseUrl + user.AVATAR_URL;
            } else {
                this.currentUser.avatarUrl = user.AVATAR_URL;
            }

            this.currentUser.nickname = user.NICK_NAME;
            this.currentUser.position = user.JOB_TITLE;
            this.currentUser.department = user.DEPT_NAME;
            this.currentUser.empno = user.EMPNO;
            this.currentUser.mobile = user.MOBILE;
            this.currentUser.email = user.EMAIL;
            this.currentUser.telephone = user.TELEPHONE;
            this.store$.dispatch(new User_Login(JSON.parse(this.pluginService.chineseConv(this.currentUser))));

            localStorage.setItem('moduleList', JSON.stringify(res.json().Modules));
            localStorage.setItem('access_token', JSON.stringify(token));
            localStorage.setItem('tokenExpires', res.json().Expires);

            if (localStorage.getItem('appLoginUser')) {
                if (this.currentUser.username === localStorage.getItem('appLoginUser')) {
                    if (localStorage.getItem('appCompanyId')) {
                        EnvConfig.companyID = localStorage.getItem('appCompanyId');
                    } else {
                        localStorage.setItem('appCompanyId', user.COMPANY_ID);
                        EnvConfig.companyID = localStorage.getItem('appCompanyId');
                    }
                } else {
                    localStorage.setItem('appLoginUser', this.currentUser.username);
                    localStorage.setItem('appCompanyId', user.COMPANY_ID);
                    EnvConfig.companyID = localStorage.getItem('appCompanyId');
                }
            } else {
                localStorage.setItem('appLoginUser', this.currentUser.username);
                localStorage.setItem('appCompanyId', user.COMPANY_ID);
                EnvConfig.companyID = localStorage.getItem('appCompanyId');
            }


            if (this.pluginService.isCordova()) {
                //把登陆人的头像保存到本地
                let myAvatar = await this.messageDatabaseService.getAvatarByUsername(this.currentUser.username);
                if (myAvatar.rows.length > 0) {
                    await this.messageDatabaseService.updateAvatarByUsername(this.currentUser.username, this.currentUser.avatarUrl);
                }
                else {
                    await this.messageDatabaseService.insertAvatarTable(this.currentUser.username, this.currentUser.nickname, this.currentUser.avatarUrl);
                }
            }
            return true;

            // this.loading.dismiss();
            // this.navCtrl.setRoot(TabsComponent);
        } else {
            if (!noErrorMsg) {
                this.showError("Get Token Error");
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
        // setTimeout(() => {
        //     this.loading.dismiss();
        // });

        let alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
        // return;
    }
}
