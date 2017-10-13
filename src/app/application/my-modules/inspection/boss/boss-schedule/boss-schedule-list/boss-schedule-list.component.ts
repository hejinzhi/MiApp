import { BossService } from './../../shared/service/boss.service';
import { Component, OnInit } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController, IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'sg-boss-schedule-list',
  templateUrl: 'boss-schedule-list.component.html',
})
export class BossScheduleListComponent implements OnInit {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    private bossService: BossService,
  ) { }
  translateTexts: any = {};

  name_id: any;
  start_date: any;
  end_date: any;
  week_id: any;
  schedulelist: any;
  inspectPeriod: any;

  /**
 * 記錄那個頁面類型調用
 * 
 * @param {*} this.navParams.data.type 
 * 1：EquipSettingComponent
 */

  async ngOnInit() {
    this.name_id = this.navParams.data.name_id;
    this.start_date = this.navParams.data.start_date;
    this.end_date = this.navParams.data.end_date;
    this.week_id = this.navParams.data.week_id;
    this.inspectPeriod = this.navParams.data.inspectPeriod;

  }

  ionViewDidLoad() {

    this.subscribeTranslateText();
  }
  async ionViewWillEnter() {
    let res: any = await this.bossService.getScheduleList(this.name_id, this.start_date, this.end_date, this.week_id);
    this.schedulelist = res.json();
    console.log(this.schedulelist);
  }

  subscribeTranslateText() {
    this.translate.get(['attendance.no_callback', 'attendance.delete_succ',
      'attendance.callbackSign_succ', 'attendance.callbackSign_err', 'attendance.cancle', 'attendance.confirm',
      'attendance.delete_alert'
    ]).subscribe((res) => {
      this.translateTexts = res;
    })
  }

  goToDetail(item: any) {
    console.log(item);
    this.navCtrl.push('BossScheduleDetailComponent', {
      item: item,
      inspectPeriod:this.inspectPeriod
    });

  }

}
