import { AlertController, LoadingController, Loading } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { tify, sify } from 'chinese-conv';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CommonService {

    constructor(
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private translate: TranslateService
    ) { }

    loading: Loading;

    showAlert(title: string, subtitle: string) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: subtitle,
            buttons: ['OK']
        });
        alert.present();
    }

    showConfirm(title: string, msg: string, cb: any) {
        let confirm = this.alertCtrl.create({
            title: title,
            message: msg,
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        cb();
                    }
                }
            ]
        });
        confirm.present();
    }


    getToday() {
        let newDate = new Date();
        let month = (newDate.getMonth() + 1) > 9 ? (newDate.getMonth() + 1) : '0' + (newDate.getMonth() + 1);
        let day = newDate.getDate() > 9 ? newDate.getDate() : '0' + newDate.getDate();
        return newDate.getFullYear() + '-' + month + '-' + day;
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    }
    hideLoading() {
        this.loading.dismiss();
    }
    chineseConv(value: string) {
        if (value) {
            let currentLang = this.translate.currentLang;
            if (!currentLang) return value;
            let chinese = ['ZH-CN', 'ZH-TW'];
            let idx = chinese.indexOf(currentLang.toUpperCase());
            switch (idx) {
                case 0:
                    // return sify(JSON.stringify(value)).replace(/^\"/g, '').replace(/\"$/g, '');
                    return sify(value);
                case 1:
                    // return tify(JSON.stringify(value)).replace(/^\"/g, '').replace(/\"$/g, '');
                    return tify(value);
                default:
                    return value;
            }
        }
    }
}