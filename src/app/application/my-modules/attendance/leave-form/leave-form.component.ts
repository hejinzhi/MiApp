import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { ValidateService }   from '../../../../core/services/validate.service';
import { PluginService }   from '../../../../core/services/plugin.service';

import { AttendanceComponent } from '../attendance.component';
import { CallbackLeaveFormComponent } from '../callback-leave-form/callback-leave-form.component';

import { HolidayType } from '../shared/config/holiday-type';

import { MyValidatorModel } from '../../../../shared/models/my-validator.model';
import { MyFormModel } from '../shared/models/my-form.model';

@Component({
  selector: 'sg-leave-form',
  templateUrl: 'leave-form.component.html'
})
export class LeaveFormComponent {

  private searchTerms = new Subject<string>();
  leaveMes: {
    type: string,
    startTime: string,
    endTime: string,
    boss: string,
    reason: string
  }
  formData:MyFormModel = {
    type:'2',
    status:'New',
    No:'HTL021703007172',
    data:{}
  }
  title:string = '创建请假单';
  haveSaved:boolean = false;
  todo: FormGroup;
  isSelectBoss: boolean = false;   // todo 判断是否正确选择代理人
  tempBoss: string = ''; // 临时作保存的中间代理人
  colleague: any;// 搜索得到的候选代理人
  timeError: string = '';
  dayLeave: string = '0';
  hourLeave: string = '0';
  myValidators:{};
  MyValidatorControl: MyValidatorModel;
  holidayType = new HolidayType().type;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private validateService: ValidateService,
    private plugin: PluginService
  ) { }

  ionViewDidLoad() {
    this.leaveMes = {
      type: '',
      startTime: '',
      endTime: '',//"2017-01-01T01:00:00Z",
      boss: '',
      reason: ''
    }
    if(this.navParams.data.detailMes){
      this.formData = this.navParams.data.detailMes;
      this.leaveMes = this.navParams.data.detailMes.data;
      this.isSelectBoss = true;
      this.title = '请假单详情';
      this.tempBoss = this.leaveMes.boss;
      this.haveSaved = true;
    }
    this.todo = this.initWork(this.leaveMes);
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
  initValidator() {
    let newValidator = new MyValidatorModel([
      {name:'type',valiItems:[{valiName:'Required',errMessage:'请选择请假类型',valiValue:true}]},
      {name:'boss',valiItems:[{valiName:'Required',errMessage:'请选择代理人',valiValue:true}]},
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
      this.dayLeave = this.hourLeave = '0';
      return;
    }
    let startTime = this.todo.controls['startTime'].value;
    let endTime = this.todo.controls['endTime'].value;
    if(startTime && endTime) {
      let interval = Date.parse(endTime) - Date.parse(startTime)
      this.dayLeave = (interval / (1000 * 60 * 60 * 24)).toFixed(1);
      this.hourLeave = (interval / (1000 * 60 * 60)).toFixed(1);
    }
  }
  //初始化原始數據
  initWork(work: any): FormGroup {
    return this.formBuilder.group({
      type: [work.type, Validators.required],
      startTime: [work.startTime, Validators.required],
      endTime: [work.endTime, Validators.required],
      boss: [work.boss, Validators.required],
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
  callBack() {
    this.navCtrl.push(CallbackLeaveFormComponent,{
      number:this.formData.No
    })
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
}
