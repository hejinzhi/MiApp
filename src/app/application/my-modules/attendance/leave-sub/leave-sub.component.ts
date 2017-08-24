import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { AttendanceService } from '../shared/service/attendance.service';
import { PluginService }   from '../../../../core/services/plugin.service';

import { LanguageTypeConfig } from '../shared/config/language-type.config';

@IonicPage()
@Component({
  selector:'sg-leave-sub',
  templateUrl: 'leave-sub.component.html'
})
export class LeaveSubComponent {

  fontType:string = localStorage.getItem('languageType')
  fontContent = LanguageTypeConfig.leaveSubComponent[this.fontType];
  translateTexts: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private attendanceService: AttendanceService,
    private plugin: PluginService,
    private translate: TranslateService
   ) {}

  ionViewDidLoad() {
    this.subscribeTranslateText();
  }

  subscribeTranslateText() {
    this.translate.get(['attendance.for_callback_tip']).subscribe((res) => {
        this.translateTexts = res;
      })
  }

  maintain_Leave() {
    this.navCtrl.push('LeaveFormComponent');
  }

  async cancel_leave(){
    let loading  = this.plugin.createLoading();
    loading.present();
    let res:any = await this.attendanceService.getCanCallbackLeaveFrom();
    loading.dismiss();
    if(res.length === 0) return this.plugin.showToast(this.translateTexts['attendance.for_callback_tip']);
    this.navCtrl.push('FormListComponent',{
      formData:res,
      type:'2',
      approved:true
    });
  }

  maintain_business():void{
    this.navCtrl.push('BusinessFormComponent');
  }
}
