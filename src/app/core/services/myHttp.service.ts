import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoginConfig } from '../../login/shared/config/login.config';

@Injectable()
export class MyHttpService {

    constructor(private http: Http) { }

    postWithoutToken(url, body) {
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        let options = new RequestOptions({ headers: headers });
        let stringBody = JSON.stringify(body);
        return this.http.post(url, stringBody, options).toPromise();
    }

    async initOptions() {
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        let token = JSON.parse(localStorage.getItem('access_token'));
        if (token && !this.isTokenExpired()) {
            headers.append('access_token', token);
        } else {
            let res = await this.getNewToken();
            let newToken = res.json().Token;
            localStorage.setItem('moduleList', JSON.stringify(res.json().Modules));
            localStorage.setItem('access_token', JSON.stringify(newToken));
            localStorage.setItem('tokenExpires', res.json().Expires);
            headers.append('access_token', newToken);
        }
        let options = new RequestOptions({ headers: headers });
        return options;
    }

    async post(url, body) {
        let options = await this.initOptions();
        let stringBody = JSON.stringify(body);
        return this.http.post(url, stringBody, options).toPromise();
    }

    async get(url) {
        let options = await this.initOptions();
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

    originGet(url) {
        return this.http.get(url).toPromise();
    }

    public getNewToken() {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        return this.postWithoutToken(LoginConfig.loginUrl, { userName: user.username, password: user.password });
    }

}