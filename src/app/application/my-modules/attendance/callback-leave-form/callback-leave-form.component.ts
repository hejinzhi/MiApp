import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SignListComponent } from '../sign-list/sign-list.component';
import { FormMenuComponent } from '../form-menu/form-menu.component';

import { ValidateService }   from '../../../../core/services/validate.service';
import { PluginService }   from '../../../../core/services/plugin.service';

import { MyValidatorModel } from '../../../../shared/models/my-validator.model';
import { MyFormModel } from '../shared/models/my-form.model';

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
    status:'New',
    No:'',
    data:{}
  }

  haveSaved:boolean = false;
  todo: FormGroup;
  myValidators:{};
  MyValidatorControl: MyValidatorModel;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private formBuilder: FormBuilder,
    private validateService: ValidateService,
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
      {name:'leave_No',valiItems:[{valiName:'Required',errMessage:'请假单号不能为空',valiValue:true}]},
      {name:'reason',valiItems:[
        {valiName:'Required',errMessage:'原因不能为空',valiValue:true},
        {valiName:'Minlength',errMessage:'原因长度不能少于2位',valiValue:2}
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
  leaveForm() {
    this.formData.data = this.todo.value
    console.log(this.formData);
    return false;
  }
  presentPopover(myEvent:any) {
    this.formData.data = this.todo.value
    let popover = this.popoverCtrl.create(FormMenuComponent,{
      formData:this.formData,
      haveSaved:this.haveSaved,
      navCtrl:this.navCtrl
    });
    popover.present({
      ev: myEvent
    });
  }
  saveForm() {
    setTimeout(() => {
      this.plugin.showToast('表单保存成功');
      this.haveSaved = true;
    },1000)
  }
  cancelForm() {
    setTimeout(() => {
      this.plugin.showToast('表单删除成功');
      setTimeout(() => {
        this.navCtrl.pop();
      },1000)
    },1000)
  }

  callbackSubmit() {

  }

  sign_list() {
    this.navCtrl.push(SignListComponent)
  }
}
