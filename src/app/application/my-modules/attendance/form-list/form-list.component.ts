import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, App, Platform } from 'ionic-angular';

import { TabsComponent } from '../../../../tabs/tabs.component'


@Component({
  selector: 'sg-form-list',
  templateUrl: 'form-list.component.html',
})
export class FormListComponent {
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
