import { PluginService } from './../../../../../../core/services/plugin.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { BossService } from './../../shared/service/boss.service';
import { Component, OnInit } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController, IonicPage, PopoverController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment'

@IonicPage()
@Component({
  selector: 'sg-boss-schedule-detail',
  templateUrl: 'boss-schedule-detail.component.html',
})
export class BossScheduleDetailComponent implements OnInit {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    private bossService: BossService,
    public popoverCtrl: PopoverController,
    private fb: FormBuilder,
    private plugin: PluginService,
  ) { }
  translateTexts: any = {};

  scheduleForm: FormGroup;

  name_id: any;
  start_date: any;
  end_date: any;
  week_id: any;
  item: any;
  inspectPeriod: any;
  locationlist: any[];
  weeklist: any[];

  selectMaxYear = +moment(new Date()).format('YYYY') + 1;
  /**
 * 記錄那個頁面類型調用
 * 
 * @param {*} this.navParams.data.type 
 * 1：EquipSettingComponent
 */

  async ngOnInit() {
    this.item = this.navParams.data.item;
    this.inspectPeriod = this.navParams.data.inspectPeriod;
    this.init();

    let res1 = await this.bossService.get7SLocation();
    this.locationlist = res1.json();
    let res2 = await this.bossService.getMriWeek(4, 8);
    this.weeklist = res2.json();

  }

  ionViewDidLoad() {
  }


  async ionViewWillEnter() {
    this.subscribeTranslateText();
  }

  init() {
    if (this.inspectPeriod === 'daily') {
      this.scheduleForm = this.fb.group({
        from_time: [this.item.FROM_TIME || '', Validators.required],
        to_time: [this.item.TO_TIME || '', Validators.required],
        scheduledate: [this.item.SCHEDULE_DATE, Validators.required],
        empno: [this.item.EMPNO || '', Validators.required]
      });
    }
    if (this.inspectPeriod === 'weekly') {
      console.log(this.item.WEEK,222);
      console.log(this.item.YEAR || this.item.WEEK,333);
      this.scheduleForm = this.fb.group({
        from_time: [this.item.FROM_TIME || '', Validators.required],
        to_time: [this.item.TO_TIME || '', Validators.required],
        scheduledate: [this.item.YEAR + this.item.WEEK || '', Validators.required],
        area: [this.item.AREA || '', Validators.required],
        empno: [this.item.EMPNO || '', Validators.required]
      });
    }
  }

  subscribeTranslateText() {
    this.translate.stream(['attendance.no_callback', 'attendance.delete_succ',
      'attendance.callbackSign_succ', 'attendance.callbackSign_err', 'attendance.cancle', 'attendance.confirm',
      'attendance.delete_alert', 'meComponent.correctsuccess'
    ]).subscribe((res) => {
      this.translateTexts = res;
    })
  }

  presentPopover(myEvent: any) {
    console.log(999);
    let popover = this.popoverCtrl.create('InspMenuComponent', {
        this: this,
        type: '3'
    });
    popover.present({
        ev: myEvent
    });
}

  async submit() {
    console.log(this.scheduleForm.value);

    let send_header = {
      schedule_header_id: '',
      company_name: '',
      name_id: '',
      schedule_name: '',
      schedule_date: '',
      year: '',
      week: '',
      from_date: '',
      to_date: '',
      from_time: '',
      to_time: '',
      enabled_flag: '',
    };

    let send_line = {
      schedule_header_id: '',
      schedule_line_id: '',
      empno: '',
      area: ''
    };

    let send_line_group: any[] = [];
    let schedules: any[] = [];

    send_header.schedule_header_id = this.item.SCHEDULE_HEADER_ID;
    send_header.company_name = this.item.COMPANY_NAME;
    send_header.name_id = this.item.NAME_ID;
    if (this.inspectPeriod === 'weekly') {
      send_header.year = this.scheduleForm.value.scheduledate.substring(0, 4);
      send_header.week = this.scheduleForm.value.scheduledate.substring(4, 6);
      send_header.from_date = this.weeklist.filter((v: any) => (v.WEEK_ID === this.scheduleForm.value.scheduledate))[0].WEEK_START_DAY;
      send_header.to_date = this.weeklist.filter((v: any) => (v.WEEK_ID === this.scheduleForm.value.scheduledate))[0].WEEK_END_DAY;
      send_header.schedule_name = this.weeklist.filter((v: any) => (v.WEEK_ID === this.scheduleForm.value.scheduledate))[0].WEEK_DESC;;
      send_header.schedule_date = '';
    }
    if (this.inspectPeriod === 'daily') {
      send_header.schedule_date = this.scheduleForm.value.scheduledate;
      send_header.from_date = this.scheduleForm.value.scheduledate;
      send_header.to_date = this.scheduleForm.value.scheduledate;
      send_header.week = '';
      send_header.year = '';
    }
    send_header.from_time = this.scheduleForm.value.from_time;
    send_header.to_time = this.scheduleForm.value.to_time;
    send_header.enabled_flag = "Y"



    send_line.schedule_header_id = this.item.SCHEDULE_HEADER_ID;
    send_line.schedule_line_id = this.item.SCHEDULE_LINE_ID;
    send_line.empno = this.scheduleForm.value.empno.split(',')[0];
    send_line.area = this.scheduleForm.value.area ? this.scheduleForm.value.area : '';
    send_line_group.push({
      "SCHEDULE_HEADER_ID": send_line.schedule_header_id,
      "SCHEDULE_LINE_ID": send_line.schedule_line_id,
      "LINE_NUM": this.item.LINE_NUM,
      "EMPNO": send_line.empno,
      "AREA": send_line.area
    });

    schedules.push({
      "Header": {
        "SCHEDULE_HEADER_ID": send_header.schedule_header_id,
        "COMPANY_NAME": send_header.company_name,
        "NAME_ID": send_header.name_id,
        "SCHEDULE_NAME": send_header.schedule_name,
        "SCHEDULE_DATE": send_header.schedule_date,
        "YEAR": send_header.year,
        "WEEK": send_header.week,
        "FROM_DATE": send_header.from_date,
        "TO_DATE": send_header.to_date,
        "FROM_TIME": send_header.from_time,
        "TO_TIME": send_header.to_time,
        "ENABLED": send_header.enabled_flag,
      },
      "Lines": send_line_group
    });
    send_line_group = [];

    console.log(schedules);

    let schedules_data = {
      "Schedules": schedules
    };

    console.log(JSON.stringify(schedules_data));

    let loading = this.plugin.createLoading();
    loading.present();
    let res: any = await this.bossService.saveSchedule(schedules_data);
    loading.dismiss();

    if (!res.status) {
      // this.errTip = res.content;
    } else {
      this.plugin.showToast(this.translateTexts['meComponent.correctsuccess']);
    };
  }

  showdetail() {
    console.log(this.scheduleForm.value);
    console.log(this.scheduleForm.valid)
  }

}
