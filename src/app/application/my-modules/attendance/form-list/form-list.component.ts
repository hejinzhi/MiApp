import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, App, Platform } from 'ionic-angular';

import { LanguageTypeConfig } from '../shared/config/language-type.config';

@Component({
  selector: 'sg-form-list',
  templateUrl: 'form-list.component.html',
})
export class FormListComponent {

  fontType:string = localStorage.getItem('languageType')
  fontContent = LanguageTypeConfig.formListComponent[this.fontType];

  showList: boolean = false;

  type: string = '100';
  formData: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App, private platform: Platform) {

  }
  ionViewDidLoad() {
    this.type = this.navParams.data.type || '100';
    this.formData = this.navParams.data.formData;
    this.showList = true;
  }

  exit() {
    this.platform.runBackButtonAction();
  }
}
