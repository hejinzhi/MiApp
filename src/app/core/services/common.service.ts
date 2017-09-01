import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

    constructor(
        private alertCtrl: AlertController
    ) { }



    showAlert(title: string, subtitle: string) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: subtitle,
            buttons: ['OK']
        });
        alert.present();
    }
}