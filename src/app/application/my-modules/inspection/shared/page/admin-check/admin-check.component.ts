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
  testData1 = [{
    time: '2017-05-09 17:20', name: '小东', site: '楼递间', detail: '有垃圾', status: '待处理', inCharge: '小天'
  },
  {
    time: '2017-05-09 17:22', name: '小东', site: '楼递间', detail: '有垃圾', status: '已处理', inCharge: '小天1'
  },
  {
    time: '2017-05-09 17:23', name: '小东', site: '楼递间', detail: '有垃圾', status: '待分配', inCharge: '小天2'
  },
  {
    time: '2017-05-09 17:24', name: '小东', site: '楼递间', detail: '有垃圾', status: 'HighLight', inCharge: '小天3'
  }
  ]
  testData2 = [{
    time: '2017-05-09 17:25', name: '小东', site: '楼递间', detail: '过期', equip_num: '123456', issue: '是否过期', status: '已处理', inCharge: '小天'
  },
  {
    time: '2017-05-09 17:26', name: '小东', site: '楼递间', detail: '过期', equip_num: '123456', issue: '是否过期', status: '待处理', inCharge: '小天'
  }]
  testData: BossReportLineState[];
  dataAll: BossReportLineState[];
  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private $store: Store<MyStore>,
    private plugin: PluginService
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
      });
    } else if (this.type === 2) {

    }
  }

  changeShow() {
    this.testData = this.dataAll.slice();
    if (+this.status < 5) {
      this.testData = this.testData.filter((item) => item.PROBLEM_STATUS === this.statsList[+this.status - 1])
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
