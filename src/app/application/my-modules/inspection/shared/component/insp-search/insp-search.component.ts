import { Machine } from './../../../equip/shared/service/equip.service';
import { Component, OnInit } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController, IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

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
    private translate: TranslateService
  ) { }
  translateTexts: any = {};
  type_id: any;
  location1: string = '';
  location2: string = '';
  location3: string = '';
  machine_no: string = '';

  /**
 * 記錄那個頁面類型調用
 * 
 * @param {*} this.navParams.data.type 
 * 1：EquipSettingComponent
 */

  ngOnInit() {
    this.type_id = this.navParams.data.type;
  }

  ionViewDidLoad() {

    this.subscribeTranslateText();
  }
  ionViewWillEnter() {

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

  }


}
