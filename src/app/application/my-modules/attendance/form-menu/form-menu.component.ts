import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController, IonicPage} from 'ionic-angular';

import { PluginService }   from '../../../../core/services/plugin.service';
import { AttendanceService } from '../shared/service/attendance.service';

import { MyFormModel } from '../shared/models/my-form.model';

import { LanguageTypeConfig } from '../shared/config/language-type.config';

@IonicPage()
@Component({
  selector: 'sg-form-menu',
  templateUrl: 'form-menu.component.html',
})
export class FormMenuComponent {

  fontType:string = localStorage.getItem('languageType')
  fontContent = LanguageTypeConfig.formMenuComponent[this.fontType];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    private plugin: PluginService,
    private attendanceService: AttendanceService
  ) {}
  formData:MyFormModel;
  haveSaved:boolean;
  lastNavCtr:any;
  that:any;
  showReset:boolean;
  ionViewDidLoad(){
    this.that = this.navParams.data.this;
    this.showReset = this.that.showReset || false;
    this.formData = this.that.formData;
    this.haveSaved = this.that.haveSaved;
    this.lastNavCtr = this.that.navCtrl;
  }
  ionViewWillEnter(){

  }
  toSearch() {
    this.viewCtrl.dismiss()
    this.lastNavCtr.push('SearchFormComponent',{
      type:this.formData.type
    })
  }

  reSet() {
    this.viewCtrl.dismiss()
    this.that.init();
  }

  async getCallbackForm() {
    this.viewCtrl.dismiss();
    let loading = this.plugin.createLoading();
    loading.present();
    let res:any = await this.attendanceService.getCallbackLeaveFrom();
    loading.dismiss();
    if(!res.status) return;
    if(res.content.length>0) {
      this.lastNavCtr.push('FormListComponent', {
        type: this.formData.type,
        formData: res.content
      })
    } else {
      this.plugin.showToast(this.fontContent.no_callback)
    }
  }
  // async toDetail() {
  //   this.viewCtrl.dismiss();
  //   let loading = this.plugin.createLoading();
  //   loading.present();
  //   let res = await this.attendanceService.getLeaveDays();
  //   loading.dismiss();
  //   if(!res) return;
  //   this.lastNavCtr.push(HoildayDetailComponent,{
  //     leaveDays:res
  //   });
  // }
  async deleteForm() {
    let confirm = this.alertCtrl.create({
      title: '确定要删除此单据吗?',
      buttons: [
        {
          text: '取消',
          handler: () => {
          }
        },
        {
          text: '确定',
          handler: () => {
            this.toDelete();
          }
        }
      ]
    });
    confirm.present();
  }
  async toDelete() {
    Object.assign(this.formData.data, this.that.value);
    this.viewCtrl.dismiss();
    let loading = this.plugin.createLoading();
    loading.present();
    let res = await this.attendanceService.deleteForm(this.formData);
    loading.dismiss();
    if(!res) return;
    this.plugin.showToast(this.fontContent.delete_succ);
    if(this.lastNavCtr.canGoBack()) {
      this.lastNavCtr.popToRoot()
    } else {
      if(this.that) {
        this.that.init()
      }
    }
  }
  async callbackSign() {
    Object.assign(this.formData.data, this.that.value);
    this.viewCtrl.dismiss();
    let loading = this.plugin.createLoading();
    loading.present();
    let res = await this.attendanceService.callBackSign(this.formData);
    loading.dismiss();
    if(!res) {
      this.plugin.showToast(this.fontContent.callbackSign_err)
      return
    };
    this.plugin.showToast(this.fontContent.callbackSign_succ);
    this.formData.status = 'CANCELED'
    // this.lastNavCtr.popToRoot()
  }
  async callBack() {
    this.viewCtrl.dismiss();
    let loading = this.plugin.createLoading();
    loading.present();
    let res:any = await this.attendanceService.getCallbackLeaveFrom(this.formData.No);
    loading.dismiss();
    if(res.content.length>0) {
      this.lastNavCtr.push('CallbackLeaveFormComponent',{
        detailMes: res.content[0]
      })
    } else {
      this.lastNavCtr.push('CallbackLeaveFormComponent',{
        form_No:this.formData.No
      })
    }
  }
  sign_list() {
    this.viewCtrl.dismiss();
    this.lastNavCtr.push('SignListComponent', {
      formData: this.formData
    })
  }
}
