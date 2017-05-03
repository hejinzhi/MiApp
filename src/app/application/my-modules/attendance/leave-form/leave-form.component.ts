import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { ValidateService }   from '../../../../core/services/validate.service';
import { PluginService }   from '../../../../core/services/plugin.service';
import { AttendanceService } from '../shared/service/attendance.service';

import { AttendanceComponent } from '../attendance.component';
import { FormMenuComponent } from '../form-menu/form-menu.component';
import { SignListComponent } from '../sign-list/sign-list.component';

import { HolidayType } from '../shared/config/holiday-type';

import { MyValidatorModel } from '../../../../shared/models/my-validator.model';
import { MyFormModel } from '../shared/models/my-form.model';

import { AttendanceConfig } from '../shared/config/attendance.config';

@Component({
  selector: 'sg-leave-form',
  templateUrl: 'leave-form.component.html'
})
export class LeaveFormComponent {

  private searchTerms = new Subject<string>();
  leaveMes: {
    reasonType: string,
    startTime: string,
    endTime: string,
    colleague: string,
    reason: string,
  }
  formData:MyFormModel = {
    type:'2',
    status:'New',
    No:'',
    data:{}
  }
  selectMaxYear = AttendanceConfig.SelectedMaxYear;
  title:string = '创建请假单';
  haveSaved:boolean = false;
  todo: FormGroup;
  isSelectcolleague: boolean = false;   // todo 判断是否正确选择代理人
  tempcolleague: string = ''; // 临时作保存的中间代理人
  colleague: any;// 搜索得到的候选代理人
  timeError: string = '';
  dayLeave: string = '0';
  hourLeave: string = '0';
  myValidators:{};
  MyValidatorControl: MyValidatorModel;
  holidayType:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private validateService: ValidateService,
    private plugin: PluginService,
    private attendanceService: AttendanceService,
    public popoverCtrl: PopoverController
  ) {new Date().toUTCString()}

  async ionViewDidLoad() {
    this.leaveMes = {
      reasonType: '',
      startTime: '',
      endTime: '',//"2017-01-01T01:00:00Z",
      colleague: '',
      reason: ''
    }
    if(this.navParams.data.detailMes){
      this.formData = this.navParams.data.detailMes;
      let detail = this.navParams.data.detailMes.data;
      for(let prop in this.leaveMes) {
        this.leaveMes[prop] = detail[prop]
      }
      this.dayLeave = this.navParams.data.detailMes.data.days || '';
      this.hourLeave = this.navParams.data.detailMes.data.hours || '';
      this.leaveMes.startTime = this.attendanceService.formatTime(this.leaveMes.startTime,false);
      this.leaveMes.endTime = this.attendanceService.formatTime(this.leaveMes.endTime,false);
      this.isSelectcolleague = true;
      this.title = '请假单详情';
      this.tempcolleague = this.leaveMes.colleague;
      this.haveSaved = true;
    }
    this.todo = this.initWork(this.leaveMes);
    this.MyValidatorControl = this.initValidator(this.leaveMes);
    this.myValidators = this.MyValidatorControl.validators;
    this.holidayType = localStorage.getItem('leaveType')? JSON.parse(localStorage.getItem('leaveType')):new HolidayType().type;
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
  }
  initValidator(bind:any) {
    let newValidator = new MyValidatorModel([
      {name:'reasonType',valiItems:[{valiName:'Required',errMessage:'请选择请假类型',valiValue:true}]},
      {name:'colleague',valiItems:[{valiName:'Required',errMessage:'请选择代理人',valiValue:true}]},
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
      startTime: [work.startTime, Validators.required],
      endTime: [work.endTime, Validators.required],
      colleague: [work.colleague, Validators.required],
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
  async leaveForm() {
    this.formData.data = this.todo.value
    let loading = this.plugin.createLoading();
    loading.present()
    let res = await this.attendanceService.sendSign(this.formData);
    loading.dismiss()
    if(res) {
      this.plugin.showToast('送签成功');
      this.navCtrl.popToRoot();
    }
    return false;
  }
  async saveForm() {
    this.formData.data = this.todo.value
    let loading = this.plugin.createLoading();
    loading.present()
    let res:any = await this.attendanceService.saveLeaveForm(this.formData);
    loading.dismiss()
    if(!res) return;
    this.dayLeave = res.DAYS;
    this.hourLeave = res.HOURS;
    this.formData.No = res.DOCNO
    this.haveSaved = true;
    this.plugin.showToast('表单保存成功');
  }
  sign_list() {
    this.navCtrl.push(SignListComponent,{
      formData: this.formData
    })
  }
}
