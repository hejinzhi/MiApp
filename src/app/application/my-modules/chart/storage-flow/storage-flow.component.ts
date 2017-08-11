import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { PluginService } from '../../../../core/services/plugin.service';
import { ChartService } from '../shared/service/chart.service';
import { OptionsConfig } from '../shared/config/options.config';

@IonicPage()
@Component({
  selector: 'sg-storage-flow',
  templateUrl: 'storage-flow.component.html',
})
export class StorageFlowComponent {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private plugin: PluginService,
    private chartService: ChartService
  ) { }
  startTime = '2017-01'
  tempData = {
    caption: '',
    data: [['年月', '库存成本', '销售成本', '天数(实际)', '天数(目标)'],
    ['201701', '566024223', '246089266', '69', '37'],
    ['201702', '608237809', '153204351', '119', '37'],
    ['201703', '627361543', '286760306', '66', 37],
    ['201704', '598960302', '257939391', '70', '37'],
    ['201705', '566319526', '209821539', '81', '37']
    ]
  }
  mi_bu: string;
  offsetTop: number;
  content: any;
  f: any;
  ionViewDidLoad() {
    this.chartService.makeChart('main1', this.chartService.optionConv(OptionsConfig.storageFlow.option1))
  }
  getOffsetTop() {
    let el: any = document.querySelector('#mySegment');
    this.offsetTop = el.offsetTop;
  }
  ionViewDidEnter() {
    this.getOffsetTop()
    this.content = document.querySelector('sg-storage-flow .scroll-content');
    window.addEventListener('resize', this.f = this.getOffsetTop.bind(this));
  }
  ionViewWillLeave() {
    window.removeEventListener('resize', this.f);
  }
  changeShow() {
    switch (this.mi_bu) {
      case 'CBU':
        setTimeout(() => {
          let option = this.chartService.optionConv(OptionsConfig.storageFlow.option1);
          option.title.text = this.mi_bu + this.plugin.chineseConv(' 存货周转天数');
          this.chartService.makeChart('main2', option, true);
        }, 20)
        this.scroll_down()
        break;
      default:
        setTimeout(() => {
          let option = this.chartService.optionConv(OptionsConfig.storageFlow.option1);
          option.title.text = this.mi_bu + this.plugin.chineseConv(' 存货周转天数');
          this.chartService.makeChart('main2', option, true);
          this.scroll_down()
        }, 20)
        break;
    }
  }
  scroll_down() {
    setTimeout(() => {
      this.content.scrollTop = this.offsetTop;
    }, 200);
  }
  search() {
    let option = this.chartService.optionConv(OptionsConfig.storageFlow.option1);
    let [year, month] = this.startTime.split('-');
    let new_x = [];
    for (let i = 0; i < 5; i++) {
      new_x.push(this.convoDate(Number(year), Number(month) + i));
    }
    option.xAxis[0].data = new_x;
    this.chartService.makeChart('main1', option)
  }
  convoDate(year: number, month: number) {
    if (month > 12) {
      return (year + 1) + '0' + (month - 12);
    } else if (month > 10) {
      return year + '' + month;
    } else {
      return year + '0' + month;
    }
  }

}
