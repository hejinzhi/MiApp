import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';

import { PluginService }   from '../../../../core/services/plugin.service';

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
  ) {}
  formData:MyFormModel;
  haveSaved:boolean;
  isforward:boolean = false;
  lastNavCtr:any;
  ionViewDidLoad(){
    this.formData = this.navParams.data.formData;
    this.haveSaved = this.navParams.data.haveSaved;
    this.lastNavCtr = this.navParams.data.navCtrl;
  }
  ionViewWillEnter(){
    if(this.isforward){
      this.viewCtrl.dismiss();
      this.isforward = false;
    }
  }
  close() {
    console.log(this.viewCtrl)
    console.log(this.navParams)
    this.viewCtrl.dismiss();
  }

  toSearch() {
    this.viewCtrl.dismiss()
    this.lastNavCtr.push(SearchFormComponent,{
      type:this.formData.type
    })

  }
  toDetail() {
    this.viewCtrl.dismiss();
    this.lastNavCtr.push(HoildayDetailComponent);
  }
  async cancelForm() {
    this.viewCtrl.dismiss();
    await setTimeout(() => {
      this.plugin.showToast('表单删除成功');
    },1000);
    setTimeout(() => {
      this.lastNavCtr.pop();
    },1000)
  }
  callbackSubmit() {
    this.viewCtrl.dismiss();
    setTimeout(() => {
      this.plugin.showToast('取消送签成功');
      setTimeout(() => {
        this.lastNavCtr.pop();
      },1000)
    },1000)
  }
  callBack() {
    this.viewCtrl.dismiss();
    this.lastNavCtr.push(CallbackLeaveFormComponent,{
      number:this.formData.No
    })
  }
}
