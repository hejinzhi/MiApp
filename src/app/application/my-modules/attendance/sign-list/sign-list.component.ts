import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { AttendanceService } from '../shared/service/attendance.service';
import { PluginService }   from '../../../../core/services/plugin.service';

import { LanguageTypeConfig } from '../shared/config/language-type.config';

@IonicPage()
@Component({
  selector: 'sg-sign-list',
  templateUrl: 'sign-list.component.html'
})
export class SignListComponent {

  fontType:string = localStorage.getItem('languageType')
  fontContent = LanguageTypeConfig.signListComponent[this.fontType];

  type: string;
  items: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private attendanceService: AttendanceService,
    private plugin: PluginService
  ) { }

  ionViewDidLoad() {
    let form_No = this.navParams.data.formData.No;
    this.getSignList(form_No)
  }
  async getSignList(form_No:string){
    let loading = this.plugin.createLoading()
    loading.present();
    let res = await this.attendanceService.getSignList(form_No);
    loading.dismiss();
    if(res.status) {
      this.items = res.content;
      console.log(this.items)
      if(this.items.length === 0) {
        this.plugin.showToast(this.fontContent.no_list);
        return;
      }
      this.items.sort((a: any, b: any) => {
        return b.version - a.version
      })
    }
  }
}
