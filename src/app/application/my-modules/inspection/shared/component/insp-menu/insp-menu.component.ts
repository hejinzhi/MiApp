import { BossService } from './../../../boss/shared/service/boss.service';
import { PluginService } from './../../../../../../core/services/plugin.service';
import { EquipService } from './../../../equip/shared/service/equip.service';
import { Component, OnInit } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController, IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'sg-insp-menu',
  templateUrl: 'insp-menu.component.html',
})
export class InspMenuComponent implements OnInit {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    private translate: TranslateService,
    private equipService: EquipService,
    private plugin: PluginService,
    private bossService: BossService,
  ) { }
  translateTexts: any = {};
  type_id: any;
  lastNavCtr: any;
  that: any;
  /**
 * 記錄那個頁面類型調用
 * 
 * @param {*} this.navParams.data.type 
 * 1：EquipSettingComponent
 * 2：BossScheduleComponent
 * 3: BossScheduleDetailComponent
 */

  ngOnInit() {
    this.type_id = this.navParams.data.type;
    this.that = this.navParams.data.this;
    this.lastNavCtr = this.that.navCtrl;
  }

  ionViewDidLoad() {

    this.subscribeTranslateText();
  }
  ionViewWillEnter() {

  }

  subscribeTranslateText() {
    this.translate.get(['delete_succ', 'attendance.cancle', 'attendance.confirm',
      'delete_alert'
    ]).subscribe((res) => {
      this.translateTexts = res;
    })
  }

  toSearch() {
    if (this.type_id == 1 || this.type_id == 2) {
      this.viewCtrl.dismiss();
      this.lastNavCtr.push('InspSearchComponent', { type: this.type_id });
    }
  }

  deleteForm() {
    let confirm = this.alertCtrl.create({
      title: this.translateTexts['delete_alert'],
      buttons: [
        {
          text: this.translateTexts['attendance.cancle'],
          handler: () => {
          }
        },
        {
          text: this.translateTexts['attendance.confirm'],
          handler: () => {
            this.toDelete();
          }
        }
      ]
    });
    confirm.present();

  }

  async toDelete() {
    this.viewCtrl.dismiss();
    let loading = this.plugin.createLoading();
    loading.present();
    let res;
    if (this.type_id == 1) {
      res = await this.equipService.deleteMachine(this.that.machine.machine_id);
    }
    if (this.type_id == 3) {
      res = await this.bossService.deleteScheduleLines(this.that.item.SCHEDULE_LINE_ID);
    }
    loading.dismiss();
    if (!res) return;
    this.plugin.showToast(this.translateTexts['delete_succ']);
    if (this.lastNavCtr.canGoBack()) {
      this.lastNavCtr.pop();
    } else {
      if (this.that) {
        this.that.init();
      }
    }
  }

}
