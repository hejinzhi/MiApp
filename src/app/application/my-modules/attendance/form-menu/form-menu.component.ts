import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController, IonicPage} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { PluginService }   from '../../../../core/services/plugin.service';
import { AttendanceService } from '../shared/service/attendance.service';

import { MyFormModel } from '../shared/models/my-form.model';

@IonicPage()
@Component({
  selector: 'sg-form-menu',
  templateUrl: 'form-menu.component.html',
})
export class FormMenuComponent {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    private plugin: PluginService,
    private attendanceService: AttendanceService,
    private translate: TranslateService
  ) {}
  formData:MyFormModel;
  haveSaved:boolean;
  lastNavCtr:any;
  that:any;
  showReset:boolean;
  translateTexts: any = {};

  ionViewDidLoad(){
    this.that = this.navParams.data.this;
    this.showReset = this.that.showReset || false;
    this.formData = this.that.formData;
    this.haveSaved = this.that.haveSaved;
    this.lastNavCtr = this.that.navCtrl;
    this.subscribeTranslateText();
  }
  ionViewWillEnter(){

  }

  subscribeTranslateText() {
    this.translate.get(['attendance.no_callback', 'attendance.delete_succ',
    'attendance.callbackSign_succ', 'attendance.callbackSign_err','attendance.cancle', 'attendance.confirm',
    'attendance.delete_alert'
  ]).subscribe((res) => {
        this.translateTexts = res;
      })
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
      this.plugin.showToast(this.translateTexts['attendance.no_callback'])
    }
  }

  async deleteForm() {
    let confirm = this.alertCtrl.create({
      title: this.translateTexts['attendance.delete_alert'],
      buttons: [
        {
          text: this.translateTexts['attendance.cancle'],
          handler: () => {
          }
        },
        {
          text: this.translateTexts['attendance.confirm'],
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
    this.plugin.showToast(this.translateTexts['attendance.delete_succ']);
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
      this.plugin.showToast(this.translateTexts['attendance.callbackSign_err'])
      return
    };
    this.plugin.showToast(this.translateTexts['attendance.callbackSign_succ']);
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
