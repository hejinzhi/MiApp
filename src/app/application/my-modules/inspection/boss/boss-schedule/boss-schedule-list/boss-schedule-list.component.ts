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
    private translate: TranslateService
  ) { }
  translateTexts: any = {};

  name_id: any;
  start_day: any;
  end_day: any;
  week_id: any;

  /**
 * 記錄那個頁面類型調用
 * 
 * @param {*} this.navParams.data.type 
 * 1：EquipSettingComponent
 */

  async ngOnInit() {
    this.name_id = this.navParams.data.name_id;
    this.start_day = this.navParams.data.start_day;
    this.end_day = this.navParams.data.end_day;
    this.week_id = this.navParams.data.week_id;

    console.log(this.name_id);
    console.log(this.start_day);
    console.log(this.end_day);
    console.log(this.week_id);

  }

  ionViewDidLoad() {

    this.subscribeTranslateText();
  }
  async ionViewWillEnter() {

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


  }

}
