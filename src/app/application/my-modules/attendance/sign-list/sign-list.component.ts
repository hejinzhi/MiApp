import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { AttendanceService } from '../shared/service/attendance.service';
import { PluginService }   from '../../../../core/services/plugin.service';


@IonicPage()
@Component({
  selector: 'sg-sign-list',
  templateUrl: 'sign-list.component.html'
})
export class SignListComponent {
  type: string;
  items: any;
  translateTexts: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private attendanceService: AttendanceService,
    private plugin: PluginService,
    private translate: TranslateService
  ) { }

  ionViewDidLoad() {
    let form_No = this.navParams.data.formData.No;
    this.getSignList(form_No);
    this.subscribeTranslateText();
  }

  subscribeTranslateText() {
    this.translate.get(['attendance.no_list']).subscribe((res) => {
        this.translateTexts = res;
      })
  }

  async getSignList(form_No:string){
    let loading = this.plugin.createLoading()
    loading.present();
    let res = await this.attendanceService.getSignList(form_No);
    loading.dismiss();
    if(res.status) {
      this.items = res.content;
      if(this.items.length === 0) {
        this.plugin.showToast(this.translateTexts['attendance.no_list']);
        return;
      }
      this.items.sort((a: any, b: any) => {
        return b.version - a.version
      })
    }
  }
}
