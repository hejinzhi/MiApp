import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { PluginService }   from '../../../../core/services/plugin.service';
import { ChartService } from '../shared/service/chart.service';

import { OptionsConfig } from '../shared/config/options.config';

@IonicPage()
@Component({
  selector: 'sg-starage-age-analysis',
  templateUrl: 'starage-age-analysis.component.html'
})
export class StarageAgeAnalysisComponent {

  pageY: number;
  pageX: number;
  @ViewChild('main1') myContent: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private plugin: PluginService,
    private chartService: ChartService
  ) { }
  tempData = {
    caption:'',
    data:[['公司','年月','0-30 days','0~30RATE','30-60 days AMT',
    '31~60RATE','61-90 days AMT','61~90RATE','91-120 days AMT',
    '91~120RATE','>120 days AMT','>120RATE','TOTAL AMT'],
    ['MSL',201701,298057650,'51.50%',99136086,
    '17.13%',40649754,'7.02%',28285935,'4.89%',112621906,'19.46%',578751333],
    ['MSL',201702,298057650,'51.50%',99136086,
    '17.13%',40649754,'7.02%',28285935,'4.89%',112621906,'19.46%',578751333],
    ['MSL',201703,298057650,'51.50%',99136086,
    '17.13%',40649754,'7.02%',28285935,'4.89%',112621906,'19.46%',578751333],
    ['MSL',201704,298057650,'51.50%',99136086,
    '17.13%',40649754,'7.02%',28285935,'4.89%',112621906,'19.46%',578751333],
    ['MSL',201705,298057650,'51.50%',99136086,
    '17.13%',40649754,'7.02%',28285935,'4.89%',112621906,'19.46%',578751333]
  ]
  }
  ionViewDidLoad() {
    this.chartService.makeChart('main1', this.chartService.optionConv(OptionsConfig.storageAge.option1))
    this.chartService.makeChart('main2', this.chartService.optionConv(OptionsConfig.storageAge.option2))
    this.chartService.makeChart('main3', this.chartService.optionConv(OptionsConfig.storageAge.option3))
  }


  draftStart(e: any) {
    this.pageY = e.touches[0].pageY;
  }
  draft(e: any) {
    let move = Math.max(e.touches[0].pageY - this.pageY, 0);
    this.myContent.nativeElement.style.marginTop = move + 'px';
  }
  draftEnd() {
    this.myContent.nativeElement.style.marginTop = '0px';
  }
  addWidth() {
    let content: any = document.querySelector('.storage .scroll-content');
    content.addEventListener('touchstart', (e: any) => {
      this.pageX = e.touches[0].pageX;
    });
    content.addEventListener('touchmove', (e: any) => {
      content.style.marginLeft = (e.touches[0].pageX - this.pageX) + 'px';
    });
    content.addEventListener('touchend', (e: any) => {
      content.style.marginLeft = 0 + 'px';
    })
  }
}
