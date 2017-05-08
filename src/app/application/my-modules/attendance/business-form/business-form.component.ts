import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { FormMenuComponent } from '../form-menu/form-menu.component';
import { SignListComponent } from '../sign-list/sign-list.component';

import { ValidateService }   from '../../../../core/services/validate.service';
import { PluginService }   from '../../../../core/services/plugin.service';
import { AttendanceService } from '../shared/service/attendance.service';

import { MyFormModel } from '../shared/models/my-form.model';
import { MyValidatorModel } from '../../../../shared/models/my-validator.model';
import { HolidayType } from '../shared/config/holiday-type';

import { AttendanceConfig } from '../shared/config/attendance.config';

@Component({
  selector: 'sg-business-form',
  templateUrl: 'business-form.component.html'
})
export class BusinessFormComponent {

  private searchTerms = new Subject<string>();

  businsessMes: {
    reasonType: string,
    autoSet: boolean,
    colleague: string,
    businessTime: string,
    startTime: string,
    endTime: string,
    reason: string
  }
  formData:MyFormModel = {
    type:'4',
    status:'New',
    No:'',
    data:{}
  }
  startHourRange:string ='';
  endHourRange:string ='';
  selectMaxYear = AttendanceConfig.SelectedMaxYear;
  haveSaved:boolean = false;
  isSelectcolleague: boolean = false;   // todo 判断是否正确选择代理人
  tempcolleague: string = ''; // 临时作保存的中间代理人
  colleague: any;// 搜索得到的候选代理人
  timeError: string = '';
  timeCount: string = '0';
  todo: FormGroup;
  myValidators:{};
  MyValidatorControl: MyValidatorModel;
  businessType = new HolidayType().businessType;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private formBuilder: FormBuilder,
    private validateService: ValidateService,
    private plugin: PluginService,
    private attendanceService: AttendanceService
  ) { }

  ionViewDidLoad() {
    this.startHourRange = this.attendanceService.getTimeRange(0,37);
    this.endHourRange = this.attendanceService.getTimeRange(0,41);
    this.businsessMes = {
      reasonType: '',
      autoSet: false,
      colleague: '',
      businessTime: '',
      startTime: '',
      endTime: '',
      reason: ''
    }

    if(this.navParams.data.detailMes){
      this.formData = this.navParams.data.detailMes;
      this.businsessMes = this.navParams.data.detailMes.data;
      this.isSelectcolleague = true;
      this.tempcolleague = this.businsessMes.colleague;
      this.haveSaved = true;
    }

    this.todo = this.initWork(this.businsessMes);
    this.MyValidatorControl = this.initValidator(this.businsessMes);
    this.myValidators = this.MyValidatorControl.validators;
    this.colleague = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => {
        if (term.length > 2) {
          return this.attendanceService.getAgent(term);
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
  initValidator(bind:any) {
    let newValidator = new MyValidatorModel([
      {name:'reasonType',valiItems:[{valiName:'Required',errMessage:'请选择加班类型',valiValue:true}]},
      {name:'autoSet',valiItems:[]},
      {name:'colleague',valiItems:[{valiName:'Required',errMessage:'请选择代理人',valiValue:true}]},
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
    ],bind)
    return newValidator;
  }
  //初始化原始數據
  initWork(work: any): FormGroup {
    return this.formBuilder.group({
      reasonType: [work.reasonType, Validators.required],
      autoSet: [work.autoSet],
      colleague: [work.colleague, Validators.required],
      startTime: [work.startTime, Validators.required],
      endTime: [work.endTime, Validators.required],
      businessTime: [work.businessTime, Validators.required],
      reason: [work.reason, Validators.required],
    });
  }
  // keyup觸發的方法
  search(item: any) {
    // todo 判断是否正确选择代理人
    if (this.tempcolleague) {
      this.isSelectcolleague = item.value != this.tempcolleague ? false : true;
    }
    this.searchTerms.next(item.value);
  }
  // 选取上级
  getcolleague(name: string) {

    this.isSelectcolleague = true;
    this.tempcolleague = name;
    this.searchTerms.next('')
    this.todo.controls['colleague'].setValue(name);
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
