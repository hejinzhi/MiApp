import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular'
import { NavController, NavParams, App, Platform, IonicPage } from 'ionic-angular';
import { LanguageConfig } from '../shared/config/language.config';

import { RewardService } from './reward.service'

@IonicPage()
@Component({
  selector: 'sg-reward',
  templateUrl: 'reward.component.html'
})
export class RewardComponent {

  languageType: string = localStorage.getItem('languageType');
  languageContent = LanguageConfig.RewardComponent[this.languageType];
  empno: string;
  itemlist: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private rewardService: RewardService,
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
