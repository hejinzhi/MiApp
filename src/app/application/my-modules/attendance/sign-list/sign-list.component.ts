import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AttendanceService } from '../shared/service/attendance.service';
import { PluginService }   from '../../../../core/services/plugin.service';

@Component({
  selector: 'sg-sign-list',
  templateUrl: 'sign-list.component.html'
})
export class SignListComponent {

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
    this.items = await this.attendanceService.getSignList(form_No);
    loading.dismiss();
    this.items.sort((a: any, b: any) => {
      return b.version - a.version
    })
  }
}
