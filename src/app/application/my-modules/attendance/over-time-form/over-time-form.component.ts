import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
;
import { ValidateService }   from '../../../../core/services/validate.service';
import { PluginService }   from '../../../../core/services/plugin.service';

import { FormMenuComponent } from '../form-menu/form-menu.component';
import { SignListComponent } from '../sign-list/sign-list.component';

import { MyValidatorModel } from '../../../../shared/models/my-validator.model';
import { MyFormModel } from '../shared/models/my-form.model';

@Component({
  selector: 'sg-over-time-form',
  templateUrl: 'over-time-form.component.html'
})
export class OverTimeFormComponent {
  OtMes: {
    type: string,
    OTtime: string,
    startTime: string,
    endTime: string,
    reason: string
  }
  formData:MyFormModel = {
    type:'3',
    status:'New',
    No:'HTL021703007172',
    data:{}
  }
  haveSaved:boolean = false;

  todo: FormGroup;
  timeError: string = '';
  OTCount: string = '0';
  myValidators:{};
  MyValidatorControl: MyValidatorModel;
  jobType =[
    {type:'01',name:'生產需要(for 直接員工)'},
    {type:'02',name:'配合產線加班'},
    {type:'03',name:'日常事務處理'},
    {type:'04',name:'OTHERS'}
  ];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private formBuilder: FormBuilder,
    private validateService: ValidateService,
    private plugin: PluginService
  ) { }

  ionViewDidLoad() {
    this.OtMes = {
      type: '',
      OTtime: '',
      startTime: '',
      endTime: '',
      reason: ''
    }
    if(this.navParams.data.detailMes) {
      this.formData = this.navParams.data.detailMes;
      this.OtMes = this.navParams.data.detailMes.data;
    }

    this.todo = this.initWork(this.OtMes);
    this.MyValidatorControl = this.initValidator();
    this.myValidators = this.MyValidatorControl.validators;
    for (let prop in this.myValidators) {
      this.todo.controls[prop].valueChanges.subscribe((value: any) => this.check(value, prop));
    }
    this.calculateTime(this.timeError);
  }
  initValidator() {
    let newValidator = new MyValidatorModel([
      {name:'type',valiItems:[{valiName:'Required',errMessage:'请选择加班类型',valiValue:true}]},
      {name:'OTtime',valiItems:[{valiName:'Required',errMessage:'加班日期不能为空',valiValue:true}]},
      {name:'reason',valiItems:[
        {valiName:'Required',errMessage:'原因不能为空',valiValue:true},
        {valiName:'Minlength',errMessage:'原因长度不能少于2位',valiValue:2}
      ]},
      {name:'startTime',valiItems:[
        {valiName:'Required',errMessage:'开始时间不能为空',valiValue:true},
        {valiName:'TimeSmaller',errMessage:'结束时间必须迟于开始时间',valiValue:'endTime'}
      ]},
      {name:'endTime',valiItems:[
        {valiName:'Required',errMessage:'结束时间不能为空',valiValue:true},
        {valiName:'TimeBigger',errMessage:'结束时间必须迟于开始时间',valiValue:'startTime'}
      ]}
    ])
    return newValidator;
  }
  //检查
  calculateTime(error:string) {
    if(error) {
      this.OTCount= '0';
      return;
    }
    let startTime = this.todo.controls['startTime'].value;
    let endTime = this.todo.controls['endTime'].value;
    let pre = '2017/01/01 ';
    if(startTime && endTime) {
      let interval = Date.parse(pre+endTime) - Date.parse(pre+startTime)
      this.OTCount = (interval / (1000 * 60 * 60)).toFixed(1);
    }
  }
  //初始化原始數據
  initWork(work: any): FormGroup {
    return this.formBuilder.group({
      type: [work.type, Validators.required],
      startTime: [work.startTime, Validators.required],
      endTime: [work.endTime, Validators.required],
      OTtime: [work.OTtime, Validators.required],
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
      if (name === 'startTime' || name === 'endTime') {
        this.timeError = prams.mes;
        this.calculateTime(this.timeError);
      }
      return Promise.resolve(this.myValidators);
    });
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
  leaveForm() {
    this.formData.data = this.todo.value
    console.log(this.formData);
    return false;
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
