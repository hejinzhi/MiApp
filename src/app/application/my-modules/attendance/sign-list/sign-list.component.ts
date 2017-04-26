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
    this.getSignList()
  }
  async getSignList(){
    let loading = this.plugin.createLoading()
    loading.present();
    this.items = await this.attendanceService.getSignList('BANK0905065');
    loading.dismiss();
    this.items.sort((a: any, b: any) => {
      return b.version - a.version
    })
  }
}
