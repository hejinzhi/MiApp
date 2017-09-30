import { EquipService, Machine } from './../../shared/service/equip.service';
import { Component, OnInit } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController, IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'sg-equip-select-list',
  templateUrl: 'equip-select-list.component.html',
})
export class EquipSelectListComponent implements OnInit {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private equipService: EquipService,
    private translate: TranslateService
  ) { }
  translateTexts: any = {};
  location1: string;
  location2: string;
  location3: string;
  machine_no: string;
  equiplist: string;
  machine: Machine;
  /**
 * 記錄那個頁面類型調用
 * 
 * @param {*} this.navParams.data.type 
 * 1：EquipSettingComponent
 */

  async ngOnInit() {
    this.location1 = this.navParams.data.location1;
    this.location2 = this.navParams.data.location2;
    this.location3 = this.navParams.data.location3;
    this.machine_no = this.navParams.data.machine_no;
  }

  ionViewDidLoad() {

    this.subscribeTranslateText();
  }
  async ionViewWillEnter() {
    let res = await this.equipService.getMachineList(this.location1, this.location2, this.location3, this.machine_no);
    this.equiplist = res.json();
    console.log(this.equiplist ,888);
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
    this.machine = {
      machine_id: item.MACHINE_ID,
      machine_no: item.MACHINE_NO,
      company_name: item.COMPANY_NAME,
      description: item.DESCRIPTION,
      quantity: item.QUANTITY,
      location1: item.LOCATION1 + '_' + item.LOCATION2 + '_' + item.LOCATION3,
      location2: '',
      location3: '',
      location4: item.LOCATION4,
      production_date: item.PRODUCTION_DATE,
      effective_date: item.EFFECTIVE_DATE,
      owner_empno: item.OWNER_EMPNO,
      name_id: item.NAME_ID,
      disable_date: item.DISABLE_DATE

    }
    this.navCtrl.push('EquipSettingComponent', { machine: this.machine, action: 'update' });

  }

}
