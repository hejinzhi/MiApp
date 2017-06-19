import { Component, OnInit } from '@angular/core';
import { ViewController, IonicPage } from 'ionic-angular';
import { LanguageConfig } from '../shared/config/language.config';

@IonicPage()
@Component({
    selector: 'sg-setting',
    templateUrl: 'setting.component.html'
})
export class SettingComponent implements OnInit {
    languageType: string = localStorage.getItem('languageType')
    languageContent = LanguageConfig.settingComponent[this.languageType];
    scanFlag: boolean = true;
    batchAddBooks: boolean = true;

    constructor(public viewCtrl: ViewController) { }

    ngOnInit() {

    }

    ionViewWillEnter() {
        this.batchAddBooks = (localStorage.getItem('batchAddBooks') === 'true') ? true : false;
    }

    dismiss() {
        localStorage.setItem('scanFlag', this.scanFlag.toString());
        localStorage.setItem('batchAddBooks', this.batchAddBooks.toString());
        this.viewCtrl.dismiss();
    }
}