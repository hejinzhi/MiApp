import { Injectable } from '@angular/core';
import { AlertController, App } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoginConfig } from '../../login/shared/config/login.config';
import { LoginComponent } from '../../login/login.component';
import { LanguageConfig } from '../config/language.config';

@Injectable()
export class MyHttpService {

    languageType: string = localStorage.getItem('languageType');
    languageContent = LanguageConfig.MyHttpService[this.languageType];

    constructor(
        private http: Http,
        private alertCtrl: AlertController,
        private app: App
    ) { }

    postWithoutToken(url: string, body: any) {
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        let options = new RequestOptions({ headers: headers });
        let stringBody = JSON.stringify(body);
        return this.http.post(url, stringBody, options).toPromise();
    }

    async initOptions(loginFlag: boolean) {
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        let token = JSON.parse(localStorage.getItem('access_token'));
        if (token && !this.isTokenExpired() && !loginFlag) {
            headers.append('access_token', token);
        } else {
            let res;
            try {
                res = await this.getNewToken();
            } catch (err) {
                if (!loginFlag) {
                    this.showError(this.languageContent.prompt, this.languageContent.logoutText, () => {
                        this.app.getRootNav().setRoot(LoginComponent);
                    });
                    return;
                }

            }
            let newToken = res.json().Token;
            localStorage.setItem('moduleList', JSON.stringify(res.json().Modules));
            localStorage.setItem('access_token', JSON.stringify(newToken));
            localStorage.setItem('tokenExpires', res.json().Expires);
            headers.append('access_token', newToken);
        }
        let options = new RequestOptions({ headers: headers });
        return options;
    }

    showError(title: string, message: string, cb: any) {
        let alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [{
                text: '确定',
                handler: () => {
                    cb();
                }
            }]
        });
        alert.present();
    }

    async post(url: string, body: any, loginFlag: boolean = false) {
        let options = await this.initOptions(loginFlag);
        let stringBody = JSON.stringify(body);
        return this.http.post(url, stringBody, options).toPromise();
    }

    async get(url: string) {
        let options = await this.initOptions(false);
        return this.http.get(url, options).toPromise();
    }

    isTokenExpired() {
        let tokenExpired = parseInt(localStorage.getItem('tokenExpires'));
        let nowTime = new Date().getTime();
        if (tokenExpired > nowTime) {
            return false;
        } else {
            return true;
        }
    }

    originGet(url: string) {
        return this.http.get(url).toPromise();
    }

    public getNewToken() {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        return this.postWithoutToken(LoginConfig.loginUrl, { userName: user.username, password: user.password });
    }

}
