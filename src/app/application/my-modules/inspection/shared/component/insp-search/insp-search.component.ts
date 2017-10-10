import { BossService } from './../../../boss/shared/service/boss.service';
import { InspectionCommonService } from './../../service/inspectionCommon.service';
import { Machine } from './../../../equip/shared/service/equip.service';
import { Component, OnInit } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController, IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment'

@IonicPage()
@Component({
  selector: 'sg-insp-search',
  templateUrl: 'insp-search.component.html',
})
export class InspSearchComponent implements OnInit {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    private translate: TranslateService,
    private inspectionCommonService: InspectionCommonService,
    private bossService: BossService,
  ) { }
  translateTexts: any = {};
  type_id: any;
  location1: any = '';
  location2: any = '';
  location3: any = '';
  location1list: any = '';
  location2list: any = '';
  location3list: any = '';
  machine_no: string = '';

  inspectPeriod: string = 'daily';
  weeklist: any[];
  mrinamelist: any[];
  name_id: any;
  start_day: any;
  end_day: any;
  week_id: any;

  selectMaxYear = +moment(new Date()).format('YYYY') + 1;

  /**
 * 記錄那個頁面類型調用
 * 
 * @param {*} this.navParams.data.type 
 * 1：EquipSettingComponent
 * 2：BossScheduleComponent
 */

  async ngOnInit() {
    this.type_id = this.navParams.data.type;

    if (this.type_id == 1) {
      let res1: any = await this.inspectionCommonService.getMriLookup('EQUIP_LOCATION1');
      this.location1list = res1.json();
      let res2: any = await this.inspectionCommonService.getMriLookup('EQUIP_LOCATION2');
      this.location2list = res2.json();
      let res3: any = await this.inspectionCommonService.getMriLookup('EQUIP_LOCATION3');
      this.location3list = res3.json();
    }

    if (this.type_id == 2) {
      let res = await this.bossService.getMriName();
      this.mrinamelist = res.json();
      let res2 = await this.bossService.getMriWeek(3, 8);
      this.weeklist = res2.json();
      this.start_day = this.start_day || moment(Date.parse(new Date().toString()) - 1000 * 60 * 60 * 24 * 30).format('YYYY-MM-DD');
      this.end_day = this.end_day || moment(Date.parse(new Date().toString())).format('YYYY-MM-DD');
    }

  }

  ionViewDidLoad() {

    this.subscribeTranslateText();
  }
  ionViewWillEnter() {

  }

  changeType() {
    this.inspectPeriod = this.mrinamelist.filter((v: any) => (v.NAME_ID === this.name_id))[0].INSPECT_PERIOD;
  }

  subscribeTranslateText() {
    this.translate.get(['attendance.no_callback', 'attendance.delete_succ',
      'attendance.callbackSign_succ', 'attendance.callbackSign_err', 'attendance.cancle', 'attendance.confirm',
      'attendance.delete_alert'
    ]).subscribe((res) => {
      this.translateTexts = res;
    })
  }

  submit() {
    if (this.type_id == 1) {
      this.navCtrl.push('EquipSelectListComponent', {
        location1: this.location1,
        location2: this.location2,
        location3: this.location3,
        machine_no: this.machine_no
      });
    }

    if (this.type_id == 2) {
      this.navCtrl.push('BossScheduleListComponent', {
        name_id: this.name_id,
        start_day: this.start_day,
        end_day: this.end_day,
        week_id: this.week_id
      });
    }



  }


}
