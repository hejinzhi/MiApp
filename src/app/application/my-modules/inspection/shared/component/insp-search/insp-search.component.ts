import { InspectionCommonService } from './../../service/inspectionCommon.service';
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
    private translate: TranslateService,
    private inspectionCommonService: InspectionCommonService,
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

  /**
 * 記錄那個頁面類型調用
 * 
 * @param {*} this.navParams.data.type 
 * 1：EquipSettingComponent
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
