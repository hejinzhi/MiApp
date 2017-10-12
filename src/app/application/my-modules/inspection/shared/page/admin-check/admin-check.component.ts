import { EquipConfig } from './../../../equip/shared/config/equip.config';
import { BossConfig } from './../../../boss/shared/config/boss.config';
import { BossService } from './../../../boss/shared/service/boss.service';
import { Query } from './../../model/common';
import { PluginService } from './../../../../../../core/services/plugin.service';
import { MyStore } from './../../../../../../shared/store';
import { BossReportLineState } from "./../../../boss/shared/store";
import { Store } from '@ngrx/store';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@IonicPage()
@Component({
  selector: 'sg-admin-check',
  templateUrl: 'admin-check.component.html'
})
export class AdminCheckComponent implements OnInit {
  statsList = ['New', 'Waiting', 'Done', 'Highlight']
  type: number = 0;
  status: string = '5';

  testData: BossReportLineState[];
  dataAll: BossReportLineState[];
  query: Query;
  first: boolean = true;

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private $store: Store<MyStore>,
    private plugin: PluginService,
    private bossService: BossService
  ) { }

  ngOnInit() {
    this.type = this.navParams.get('type') || 0;
    this.initData();
  }
  initData() {
    if (this.type === 1) {
      this.$store.select('lineAllReducer').subscribe((list: BossReportLineState[]) => {
        this.testData = list;
        this.dataAll = this.testData.slice();
        this.changeShow();
      });
    } else if (this.type === 2) {
      this.$store.select('linesAllEquipReducer').subscribe((list: BossReportLineState[]) => {
        this.testData = list;
        this.dataAll = this.testData.slice();
        this.changeShow();
      });
    }
  }

  changeShow() {
    if (!this.dataAll) return;
    this.testData = this.dataAll.slice();
    if (+this.status < 5) {
      this.testData = this.testData.filter((item) => item.PROBLEM_STATUS === this.statsList[+this.status - 1])
    }
  }

  queryChange(query: Query) {
    this.query = query;
    if (this.first) {
      this.search();
    }
  }

  search() {
    let type: string = '';
    switch (+this.type) {
      case 1:
        type = BossConfig.type;
        break;
      case 2:
        type = EquipConfig.type;
        break;
    }
    this.bossService.getAdminLinesAll(this.query, type, !this.first);
    if (this.first) {
      this.first = false;
    }
  }

  toDetail(item: any) {
    console.log(item);
    if (typeof item.PROBLEM_PICTURES === 'string') {
      item.PROBLEM_PICTURES = this.plugin.getPictureUrlArray(item.PROBLEM_PICTURES)
    }
    this.navCtrl.push('IssueDetailComponent', {
      issue: item,
      type: this.type,
      admin: true
    })
  }



}
