import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { PluginService }   from '../../../../core/services/plugin.service';
import { ChartService } from '../shared/service/chart.service';
import { OptionsConfig } from '../shared/config/options.config';

@IonicPage()
@Component({
  selector: 'sg-obs-storage',
  templateUrl: 'obs-storage.component.html',
})
export class ObsStorageComponent {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private plugin: PluginService,
    private chartService: ChartService
  ) { }
  tempData = {
    caption: '',
    data: [['BU', '年度','18周', '19周', '20周', '21周', '22周','23周','24周'],
      ['CBU', '2017', '12934827', '13241493', '12841336', '12852982',13847569,13797455,12781020],
      ['EBU', '2017', '12934827', '13241493', '12841336', '12852982',13847569,13797455,12781020],
      ['MBU', '2017', '12934827', '13241493', '12841336', '12852982',13847569,13797455,12781020],
      ['TBU', '2017', '12934827', '13241493', '12841336', '12852982',13847569,13797455,12781020]
    ]
  }
  tempData2 = {
    caption: '',
    data: [['BU', '客户','18周', '19周', '20周', '21周', '22周','23周','24周'],
      ['EBU', 'cosmos', '12934827', '13241493', '12841336', '12852982',13847569,13797455,12781020],
      ['EBU', 'cosmos', '12934827', '13241493', '12841336', '12852982',13847569,13797455,12781020],
      ['EBU', 'cosmos', '12934827', '13241493', '12841336', '12852982',13847569,13797455,12781020],
      ['EBU', 'cosmos', '12934827', '13241493', '12841336', '12852982',13847569,13797455,12781020],
      ['EBU', 'cosmos', '12934827', '13241493', '12841336', '12852982',13847569,13797455,12781020],
      ['EBU 汇总', '', '12934827', '13241493', '12841336', '12852982',13847569,13797455,12781020]
    ]
  }
  mi_bu: string;
  ionViewDidLoad() {
    this.chartService.makeChart('main1a', this.chartService.optionConv(OptionsConfig.ObsStorage.option1))
    this.chartService.makeChart('main1b', this.chartService.optionConv(OptionsConfig.ObsStorage.option2))
    this.chartService.makeChart('main1c', this.chartService.optionConv(OptionsConfig.ObsStorage.option3))
  }
  changeShow() {
    switch (this.mi_bu) {
      default:
        setTimeout(() => {
          let dom1 = document.getElementById('main2a');
          dom1.style.height = window.outerHeight *0.47 +'px';
          let option1 = this.chartService.optionConv(OptionsConfig.ObsStorage.option1);
          option1.title.text = this.mi_bu + this.plugin.chineseConv('第24周OBS库存top 5');
          option1.yAxis[0].data = ['S start','EMAC','MIC(CBU)','MIC(others)','others'];
          this.chartService.makeChartWithDom(dom1, option1);

          let dom2 = document.getElementById('main2b');
          dom2.style.height = window.outerHeight *0.47 +'px';
          let option2 = this.chartService.optionConv(OptionsConfig.ObsStorage.option2);
          let newLegend = ['S start','EMAC','MIC(CBU)','MIC(others)','others'];
          option2.legend.data = newLegend;
          option2.series[0].data.map((item:any,index:number) => {
            return item.name = newLegend[index];
          })
          option2.title.text = this.mi_bu + this.plugin.chineseConv(' 第24周OBS库存top 5');
          this.chartService.makeChartWithDom(dom2, option2);

          let dom3 = document.getElementById('main2c');
          dom3.style.height = window.outerHeight *0.47 +'px';
          let option3 = this.chartService.optionConv(OptionsConfig.ObsStorage.option3);
          option3.legend.data = newLegend;
          option3.series.map((item:any,index:number) => {
            return item.name = newLegend[index];
          })
          option3.title.text = this.mi_bu + this.plugin.chineseConv(' top 5 OBS库存趋势图');
          this.chartService.makeChartWithDom(dom3, option3);

          this.scroll_down()
        }, 20)
        break;
    }
  }
  scroll_down() {
    setTimeout(() => {
      var div = document.querySelector('sg-obs-storage .scroll-content');
      div.scrollTop = div.scrollHeight;
    }, 200);
  }

}
