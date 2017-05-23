import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SignListComponent } from '../sign-list/sign-list.component';
import { FormMenuComponent } from '../form-menu/form-menu.component';

import { ValidateService }   from '../../../../core/services/validate.service';
import { PluginService }   from '../../../../core/services/plugin.service';
import { AttendanceService } from '../shared/service/attendance.service';

import { MyValidatorModel } from '../../../../shared/models/my-validator.model';
import { MyFormModel } from '../shared/models/my-form.model';

import { LanguageTypeConfig } from '../shared/config/language-type.config';

@Component({
  selector: 'sg-callback-leave-form',
  templateUrl: 'callback-leave-form.component.html'
})
export class CallbackLeaveFormComponent {
  callbackMes: {
    leave_No: string,
    reason: string
  }
  formData:MyFormModel = {
    type:'5',
    status:'',
    No:'',
    data:{}
  }
  fontType:string = localStorage.getItem('languageType')
  fontContent = LanguageTypeConfig.callbackLeaveFormComponent[this.fontType];

  haveSaved:boolean = false;
  errTip:string ='';
  todo: FormGroup;
  myValidators:{};
  MyValidatorControl: MyValidatorModel;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private formBuilder: FormBuilder,
    private validateService: ValidateService,
    private attendanceService: AttendanceService,
    private plugin: PluginService
  ) { }

  ionViewDidLoad() {
    this.callbackMes = {
      leave_No: '',
      reason: ''
    }

    if(this.navParams.data.detailMes) {
      this.formData = this.navParams.data.detailMes;
      this.callbackMes = this.navParams.data.detailMes.data;
      this.haveSaved = true;
    }
    if(this.navParams.data.form_No) {
      this.callbackMes.leave_No = this.navParams.data.form_No;
    }
    this.todo = this.initWork(this.callbackMes);
    this.MyValidatorControl = this.initValidator(this.callbackMes);
    this.myValidators = this.MyValidatorControl.validators;
    for (let prop in this.myValidators) {
      this.todo.controls[prop].valueChanges.subscribe((value: any) => this.check(value, prop));
    }
  }
  initValidator(bind:any) {
    let newValidator = new MyValidatorModel([
      {name:'leave_No',valiItems:[{valiName:'Required',errMessage:this.fontContent.leave_No_required_err,valiValue:true}]},
      {name:'reason',valiItems:[
        {valiName:'Required',errMessage:this.fontContent.reason_required_err,valiValue:true},
        {valiName:'Minlength',errMessage:this.fontContent.reason_minlength_err,valiValue:2}
      ]}
    ],bind)
    return newValidator;
  }
  //初始化原始數據
  initWork(work: any): FormGroup {
    return this.formBuilder.group({
      leave_No: [work.leave_No, Validators.required],
      reason: [work.reason, Validators.required],
    });
  }
  //單獨輸入塊驗證
  check(value: any, name: string): Promise<any> {
    this.myValidators[name].value = value;
    let compare = this.myValidators[name].compare ? this.myValidators[this.myValidators[name].compare] : ''
    return this.validateService.check(this.myValidators[name], this.myValidators).then((prams) => {
      this.myValidators[name].error = prams.mes;
      this.myValidators[name].pass = !prams.mes;
      return Promise.resolve(this.myValidators);
    });
  }
  presentPopover(myEvent:any) {
    let popover = this.popoverCtrl.create(FormMenuComponent,{
      this:this,
    });
    popover.present({
      ev: myEvent
    });
  }
  async leaveForm() {
    this.formData.data = this.todo.value
    let loading = this.plugin.createLoading();
    loading.present()
    let res: any = await this.attendanceService.sendSign(this.formData);
    loading.dismiss()
    if (res.status) {
      this.plugin.showToast(this.fontContent.sign_success);
      this.haveSaved = true;
      this.formData.status = 'WAITING';
      if(res.content) {
        this.formData.No = res.content.DOCNO1
      }
      // this.navCtrl.popToRoot();
    } else {
      this.errTip = res.content;
    }
    return false;
  }
  async saveForm() {
    this.formData.data = this.todo.value
    let loading = this.plugin.createLoading();
    loading.present()
    let res: any = await this.attendanceService.saveCallbackLeaveFrom(this.formData);
    loading.dismiss()
    if (!res.status) {
      this.errTip = res.content
    } else {
      this.errTip = '';
      let data = res.content
      this.formData.status = data.STATUS;
      this.formData.No = data.DOCNO1
      this.haveSaved = true;
      this.plugin.showToast(this.fontContent.save_success);
    };
  }
  sign_list() {
    this.navCtrl.push(SignListComponent,{
      formData: this.formData
    })
  }
}
