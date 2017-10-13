import { PluginService } from './../../../../../core/services/plugin.service';
import { async } from '@angular/core/testing';
import { EquipService } from './../shared/service/equip.service';
import { InspectionCommonService } from './../../shared/service/inspectionCommon.service';
import { Component, OnInit } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'sg-equip-schedule',
  templateUrl: './equip-schedule.component.html'
})
export class EquipScheduleComponent implements OnInit {

  translateTexts: any = {};
  selectMaxYear = +moment(new Date()).format('YYYY') + 10;
  year: any = '';
  month: any = '';
  name_id: any = '';
  location1: any = '';
  location2: any = '';
  location3: any = '';
  machine_no: any = '';
  mrinamelist: any[];
  location1list: any[];
  location2list: any[];

  constructor(
    private navCtrl: NavController,
    private inspectionCommonService: InspectionCommonService,
    private equipService: EquipService,
    public alertCtrl: AlertController,
    private translate: TranslateService,
    private plugin: PluginService,
  ) { }

  async ngOnInit() {
    let res = await this.inspectionCommonService.getMriName('equip');
    this.mrinamelist = res.json();
    let res1: any = await this.inspectionCommonService.getMriLookup('EQUIP_LOCATION1');
    this.location1list = res1.json();
    let res2: any = await this.inspectionCommonService.getMriLookup('EQUIP_LOCATION2');
    this.location2list = res2.json();
    this.subscribeTranslateText();
  }

  ionViewDidLoad() {
    this.year = moment(new Date()).format('YYYY-MM-DD');
    this.month = moment(new Date()).format('YYYY-MM-DD');
  }

  subscribeTranslateText() {
    this.translate.get(['produce_succ', 'attendance.cancle', 'attendance.confirm',
      'delete_alert','inspection.equipcom.setschedulealert'
    ]).subscribe((res) => {
      this.translateTexts = res;
    })
  }

  goToDeatilPage() {
    this.navCtrl.push('ScheduleDetailComponent');
  }

  async setSchedule() {
    let res: any = await this.equipService.getMachineSchedule(this.year.substring(0, 4), this.month.substring(5, 7), this.name_id);
    let quantity = res.json().QUANTITY;
    if (quantity == 0) {
      this.setMachineSchedule();
    } else {
      let confirm = this.alertCtrl.create({
        title: this.translateTexts['inspection.equipcom.setschedulealert'],
        buttons: [
          {
            text: this.translateTexts['attendance.cancle'],
            handler: () => {
            }
          },
          {
            text: this.translateTexts['attendance.confirm'],
            handler: () => {
              this.setMachineSchedule();
            }
          }
        ]
      });
      confirm.present();
    }
  }

 async setMachineSchedule(){
    let loading = this.plugin.createLoading();
    loading.present();
    let  res = await this.equipService.setMachineSchedule(this.year.substring(0, 4), this.month.substring(5, 7), this.name_id);
    loading.dismiss();
    if (!res) return;
    this.plugin.showToast(this.translateTexts['produce_succ']);
  }

  showdetail() {
    console.log(this.year);
  }
}
