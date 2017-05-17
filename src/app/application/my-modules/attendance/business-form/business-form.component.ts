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
import { LanguageTypeConfig } from '../shared/config/language-type.config';

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
  formData: MyFormModel = {
    type: '4',
    status: '',
    No: '',
    data: {}
  }

  fontType: string = localStorage.getItem('languageType')
  fontContent = LanguageTypeConfig.businessFormComponent[this.fontType];

  startHourRange: string = '';
  endHourRange: string = '';
  selectMaxYear = AttendanceConfig.SelectedMaxYear;
  haveSaved: boolean = false;
  isSelectcolleague: boolean = false;   // todo 判断是否正确选择代理人
  tempcolleague: string = ''; // 临时作保存的中间代理人
  colleague: any;// 搜索得到的候选代理人
  timeError: string = '';
  hourCount: string = '';
  dayCount: string ='';
  todo: FormGroup;
  myValidators: {};
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

  async ionViewDidLoad() {
    this.startHourRange = this.attendanceService.getTimeRange(0, 37);
    this.endHourRange = this.attendanceService.getTimeRange(0, 41);
    this.businsessMes = {
      reasonType: '',
      autoSet: false,
      colleague: '',
      businessTime: '',
      startTime: '',
      endTime: '',
      reason: ''
    }

    if (this.navParams.data.detailMes) {
      this.formData = this.navParams.data.detailMes;
      let detail = this.navParams.data.detailMes.data;
      for (let prop in this.businsessMes) {
        this.businsessMes[prop] = detail[prop]
      }
      this.hourCount = this.navParams.data.detailMes.data.hours || '';
      this.dayCount = this.navParams.data.detailMes.data.days || '';
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
    if (!this.haveSaved && !this.todo.controls['businessTime'].value) {
      let day = new Date().toISOString()
      this.todo.controls['businessTime'].setValue(day.substr(0, day.indexOf('T')));
      this.askForDuring();
    }
    this.addSubcribe();
  }
  addSubcribe() {
    for (let prop in this.myValidators) {
      if(['startTime', 'endTime'].indexOf(prop) <0) {
        this.todo.controls[prop].valueChanges.subscribe((value: any) => this.check(value, prop));
      }
    }
    let timeCheck = ['businessTime', 'startTime', 'endTime']
    for (let i = 0; i < timeCheck.length; i++) {
      let check = timeCheck[i];
      this.todo.controls[check].valueChanges.subscribe((value: any) => {
        this.check(value,check).then(() => {
          if(!this.timeError) {
            this.askForDuring()
          }
        })
        })
    }
  }
  initValidator(bind: any) {
    let newValidator = new MyValidatorModel([
      { name: 'reasonType', valiItems: [{ valiName: 'Required', errMessage: this.fontContent.reasonType_required_err, valiValue: true }] },
      { name: 'autoSet', valiItems: [] },
      { name: 'colleague', valiItems: [{ valiName: 'Required', errMessage: this.fontContent.colleague_required_err, valiValue: true }] },
      { name: 'businessTime', valiItems: [{ valiName: 'Required', errMessage: this.fontContent.businessTime_required_err, valiValue: true }] },
      {
        name: 'reason', valiItems: [
          { valiName: 'Required', errMessage: this.fontContent.reason_required_err, valiValue: true },
          { valiName: 'Minlength', errMessage: this.fontContent.reason_minlength_err, valiValue: 2 }
        ]
      },
      {
        name: 'startTime', valiItems: [
          { valiName: 'Required', errMessage: this.fontContent.startTime_required_err, valiValue: true },
          { valiName: 'TimeSmaller', errMessage: this.fontContent.startTime_timeSmaller_err, valiValue: 'endTime' }
        ]
      },
      {
        name: 'endTime', valiItems: [
          { valiName: 'Required', errMessage: this.fontContent.endTime_required_err, valiValue: true },
          { valiName: 'TimeBigger', errMessage: this.fontContent.endTime_timeBigger_err, valiValue: 'startTime' }
        ]
      }
    ], bind)
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
  updateDuring(data: MyFormModel) {
    this.hourCount = data.data.hours || '';
    this.dayCount = data.data.days || '';
    this.myValidators['startTime'].value = data.data.startTime;
    this.myValidators['endTime'].value = data.data.endTime;
    Object.assign(this.businsessMes, this.todo.value);
    this.businsessMes.startTime = data.data.startTime;
    this.businsessMes.endTime = data.data.endTime;
    this.todo = this.initWork(this.businsessMes);
    this.addSubcribe();
  }
  async askForDuring() {
    let values = this.todo.controls
    let tempData:MyFormModel = {
      type: this.formData.type,
      status: this.formData.status,
      No: this.formData.No,
      data: {
        reasonType: '',
        autoSet: false,
        businessTime:values.businessTime.value,
        startTime: values.startTime.value,
        endTime: values.endTime.value,
        colleague: '',
        reason: ''
      }
    }
    let res: any = await this.attendanceService.getLeaveDuring(tempData);
    if (!res) return;
    this.updateDuring(res);
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
check(value: any, name: string): Promise < any > {
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
    this.navCtrl.popToRoot();
  }
  if (res.content) {
    this.formData.status = res.content.STATUS;
    this.hourCount = res.content.HOURS;
    this.dayCount = res.content.DAYS
    this.haveSaved = true;
  }
  return false;
}
async saveForm() {
  this.formData.data = this.todo.value
  let loading = this.plugin.createLoading();
  loading.present()
  let res: any = await this.attendanceService.saveLeaveForm(this.formData);
  loading.dismiss()
  if (!res) return;
  this.formData.No = res.DOCNO
  this.formData.status = res.STATUS;
  this.hourCount = res.HOURS;
  this.dayCount = res.DAYS
  this.haveSaved = true;
  this.plugin.showToast(this.fontContent.save_success);
}
}
