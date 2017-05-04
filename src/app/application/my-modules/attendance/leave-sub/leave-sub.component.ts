import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LeaveFormComponent } from '../leave-form/leave-form.component';
import { FormListComponent } from '../form-list/form-list.component';
import { BusinessFormComponent } from '../business-form/business-form.component';

import { AttendanceService } from '../shared/service/attendance.service';
import { PluginService }   from '../../../../core/services/plugin.service';

@Component({
  selector:'sg-leave-sub',
  templateUrl: 'leave-sub.component.html'
})
export class LeaveSubComponent {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private attendanceService: AttendanceService,
    private plugin: PluginService
   ) {}

  ionViewDidLoad() {
  }

  maintain_Leave() {
    this.navCtrl.push(LeaveFormComponent);
  }

  async cancel_leave(){
    let loading  = this.plugin.createLoading();
    loading.present();
    let res = await this.attendanceService.getForm({
      type: '2',
      startTime: '',
      endTime: '',
      form_No: ''
    });
    loading.dismiss();
    res = res.filter((item: any) => {
      return item.status.toUpperCase() === 'APPROVED';
    })
    if(res.length === 0) return this.plugin.showToast('无可销假的假单');
    this.navCtrl.push(FormListComponent,{
      formData:res,
      type:'2'
    });
  }

  maintain_business():void{
    this.navCtrl.push(BusinessFormComponent);
  }
}
