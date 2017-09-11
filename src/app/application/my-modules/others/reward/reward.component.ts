import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular'
import { NavController, NavParams, App, Platform, IonicPage } from 'ionic-angular';

import { RewardService } from './reward.service'
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'sg-reward',
  templateUrl: 'reward.component.html'
})
export class RewardComponent {

  empno: string;
  itemlist: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private rewardService: RewardService,
    private translate: TranslateService
  ) {
    // console.log(navParams.data.empno,463);
    this.empno = navParams.data.empno;
  }

  ionViewDidLoad() {
    this.rewardService.getRewardList(this.empno).then((res: any) => {
      this.itemlist = res.json();
    })
  }

  ionViewWillLeave() {

  }


}

export class RewardList {
  DOCNO: string;
  EMPNO: string;
  NAME: string;
  EFFECT_DATE: string;
  SUIT_ORDINANCE: string;
  REASON: string;
  TIMES: string;
  STATUS: string;
  KIND_REMARK: string;
}
