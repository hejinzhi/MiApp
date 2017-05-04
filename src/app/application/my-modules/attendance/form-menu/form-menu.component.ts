import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';

import { PluginService }   from '../../../../core/services/plugin.service';
import { AttendanceService } from '../shared/service/attendance.service';

import { SearchFormComponent } from '../search-form/search-form.component';
import { CallbackLeaveFormComponent } from '../callback-leave-form/callback-leave-form.component';
import { HoildayDetailComponent } from '../hoilday-detail/holiday-detail.component';

import { MyFormModel } from '../shared/models/my-form.model';

@Component({
  selector: 'sg-form-menu',
  templateUrl: 'form-menu.component.html',
})
export class FormMenuComponent {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private plugin: PluginService,
    private attendanceService: AttendanceService
  ) {}
  formData:MyFormModel;
  haveSaved:boolean;
  lastNavCtr:any;
  ionViewDidLoad(){
    this.formData = this.navParams.data.formData;
    this.haveSaved = this.navParams.data.haveSaved;
    this.lastNavCtr = this.navParams.data.navCtrl;
  }
  ionViewWillEnter(){

  }
  toSearch() {
    this.viewCtrl.dismiss()
    this.lastNavCtr.push(SearchFormComponent,{
      type:this.formData.type
    })

  }
  async toDetail() {
    this.viewCtrl.dismiss();
    let loading = this.plugin.createLoading();
    loading.present();
    let res = await this.attendanceService.getLeaveDays();
    loading.dismiss();
    if(!res) return;
    this.lastNavCtr.push(HoildayDetailComponent,{
      leaveDays:res
    });
  }
  async deleteForm() {
    this.viewCtrl.dismiss();
    let loading = this.plugin.createLoading();
    loading.present();
    let res = await this.attendanceService.deleteForm(this.formData);
    loading.dismiss();
    if(!res) return;
    this.plugin.showToast('删除表单成功');
    return this.lastNavCtr.canGoBack()?this.lastNavCtr.popToRoot():'';
  }
  async callbackSign() {
    this.viewCtrl.dismiss();
    let loading = this.plugin.createLoading();
    loading.present();
    let res = await this.attendanceService.callBackSign(this.formData);
    loading.dismiss();
    if(!res) return;
    this.plugin.showToast('取消送签成功');
    this.lastNavCtr.popToRoot()
  }
  callBack() {
    this.viewCtrl.dismiss();
    this.lastNavCtr.push(CallbackLeaveFormComponent,{
      form_No:this.formData.No
    })
  }
}
