import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { ValidateService }   from '../../../../core/services/validate.service';
import { PluginService }   from '../../../../core/services/plugin.service';

import { MyFormModel } from '../shared/models/my-form.model';
import { MyValidatorModel } from '../../../../shared/models/my-validator.model';

@Component({
  selector: 'sg-business-form',
  templateUrl: 'business-form.component.html'
})
export class BusinessFormComponent {

  private searchTerms = new Subject<string>();

  businsessMes: {
    type: string,
    autoSet: boolean,
    boss: string,
    businessTime: string,
    startTime: string,
    endTime: string,
    reason: string
  }
  formData:MyFormModel = {
    type:'4',
    status:'New',
    No:'HTL021703007172',
    data:{}
  }
  canEdit:boolean = true;
  canCancel:boolean = false;
  isSelectBoss: boolean = false;   // todo 判断是否正确选择代理人
  tempBoss: string = ''; // 临时作保存的中间代理人
  colleague: any;// 搜索得到的候选代理人
  timeError: string = '';
  timeCount: string = '0';
  todo: FormGroup;
  myValidators:{};
  MyValidatorControl: MyValidatorModel;
  businessType = [
    {type:'10',name:'新員工招聘室簽署合同'},
    {type:'20',name:'前往招聘辦公室處理公務'},
    {type:'30',name:'前往醫務室婦檢'},
    {type:'40',name:'因公外出（出差、過磅、辦證、政府部門及銀行辦理業務等)'},
    {type:'50',name:'受訓、開會'},
    {type:'60',name:'出差期間加班時數計算'},
    {type:'70',name:'陪同客戶外出、用餐等'},
    {type:'80',name:'其它'}
  ]
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private validateService: ValidateService,
    private plugin: PluginService
  ) { }

  ionViewDidLoad() {
    this.businsessMes = {
      type: '',
      autoSet: false,
      boss: '',
      businessTime: '',
      startTime: '',
      endTime: '',
      reason: ''
    }

    if(this.navParams.data.detailMes){
      this.formData = this.navParams.data.detailMes;
      this.businsessMes = this.navParams.data.detailMes.data;
      this.isSelectBoss = true;
      this.tempBoss = this.businsessMes.boss;
      if(this.formData.status.toUpperCase() === 'APPROVED') {
        this.canEdit = false;
      }else {
        this.canCancel = true;
      }
    }

    this.todo = this.initWork(this.businsessMes);
    this.MyValidatorControl = this.initValidator();
    this.myValidators = this.MyValidatorControl.validators;
    this.colleague = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => {
        if (term) {
          return Observable.of<any>([{ name: 'xiaomi' }, { name: 'xiaodong' }])
        } else {
          return Observable.of<any>([])
        }
      })
      .catch(error => {
        // TODO: real error handling
        return Observable.of<string>(error);
      });
    for (let prop in this.myValidators) {
      this.todo.controls[prop].valueChanges.subscribe((value: any) => this.check(value, prop));
    }
    this.calculateTime(this.timeError);
  }
  //检查
  calculateTime(error:string) {
    if(error) {
      this.timeCount= '0';
      return;
    }
    let startTime = this.todo.controls['startTime'].value;
    let endTime = this.todo.controls['endTime'].value;
    let pre = '2017/01/01 ';
    if(startTime && endTime) {
      let interval = Date.parse(pre+endTime) - Date.parse(pre+startTime)
      this.timeCount = (interval / (1000 * 60 * 60)).toFixed(1);
    }
  }
  initValidator() {
    let newValidator = new MyValidatorModel([
      {name:'type',valiItems:[{valiName:'Required',errMessage:'请选择加班类型',valiValue:true}]},
      {name:'autoSet',valiItems:[]},
      {name:'boss',valiItems:[{valiName:'Required',errMessage:'请选择代理人',valiValue:true}]},
      {name:'businessTime',valiItems:[{valiName:'Required',errMessage:'公出日期不能为空',valiValue:true}]},
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
  //初始化原始數據
  initWork(work: any): FormGroup {
    return this.formBuilder.group({
      type: [work.type, Validators.required],
      autoSet: [work.autoSet],
      boss: [work.boss, Validators.required],
      startTime: [work.startTime, Validators.required],
      endTime: [work.endTime, Validators.required],
      businessTime: [work.businessTime, Validators.required],
      reason: [work.reason, Validators.required],
    });
  }
  // keyup觸發的方法
  search(item: any) {
    // todo 判断是否正确选择代理人
    if (this.tempBoss) {
      this.isSelectBoss = item.value != this.tempBoss ? false : true;
    }
    this.searchTerms.next(item.value);
  }
  // 选取上级
  getBoss(name: string) {

    this.isSelectBoss = true;
    this.tempBoss = name;
    this.searchTerms.next('')
    this.todo.controls['boss'].setValue(name);
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
  leaveForm() {
    this.formData.data = this.todo.value
    console.log(this.formData);
    return false;
  }

  saveForm() {
    setTimeout(() => {
      this.plugin.showToast('表单保存成功');
      this.canCancel = true;
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
}
