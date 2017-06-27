import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { PluginService }   from '../../../../core/services/plugin.service';
import { ChartService } from '../shared/service/chart.service';

@IonicPage()
@Component({
  selector: 'sg-starage-age-analysis',
  templateUrl: 'starage-age-analysis.component.html'
})
export class StarageAgeAnalysisComponent {

  isHere:boolean;
  fontFamily:string[] = ['Helvetica', 'Tahoma', 'Arial', 'STXihei', '华文细黑', 'Microsoft YaHei', '微软雅黑', 'sans-serif'];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private plugin: PluginService,
    private chartService: ChartService
  ) { }

  ionViewDidLoad() {
    this.chartService.initDoubleYChart('main1','IDL年资分析',{
      legend_data:['0-30 days AMT','30-60 days AMT','61-90 days AMT','91-120 days AMT','>120 days AMT','0-30RATE','31-60RATE','61-90RATE','91-120RATE','120RATE'],
      xAxis_data:['201701','201702','201703','201704','201705'],
      series:[{
        name:'0-30 days AMT',
        type:'bar',
        data: [{value: 298057650},{value: 326359815},{value: 287728183},{value: 234650359},
          {value: 221514561}]
      },{
        name:'30-60 days AMT',
        type:'bar',
        data: [{value: 99136086},{value: 122085446},{value: 130271557},{value: 93448435},
          {value: 70752847}]
      },{
        name:'61-90 days AMT',
        type:'bar',
        data: [{value: 40649754},{value: 48184630},{value: 53114304},{value: 86811628},
          {value: 53017785}]
      },{
        name:'91-120 days AMT',
        type:'bar',
        data: [{value: 28285935},{value: 28984522},{value: 26992622},{value: 37286349},
          {value: 69500338}]
      },
      {
        name:'>120 days AMT',
        type:'bar',
        data: [{value: 112621906},{value: 112109870},{value: 118892134},{value: 128725030},
          {value: 137531714}]
      }
    ]
    },[{
      name:'0-30RATE',
      type:'line',
      yAxisIndex: 1,
      data: [{value: 51.5},{value: 51.18},{value:46.63},{value:40.39},
        {value: 40.15}]
    },{
      name:'31-60RATE',
      type:'line',
      yAxisIndex: 1,
      data: [{value: 17.13},{value: 19.14},{value:21.11},{value:16.09},
        {value: 12.72}]
    },{
      name:'61-90RATE',
      type:'line',
      yAxisIndex: 1,
      data: [{value: 7.02},{value: 7.56},{value:8.61},{value:14.94},
        {value: 9.61}]
    },{
      name:'91-120RATE',
      type:'line',
      yAxisIndex: 1,
      data: [{value: 4.89},{value: 4.54},{value:4.37},{value:6.42},
        {value: 12.6}]
    },{
      name:'120RATE',
      type:'line',
      yAxisIndex: 1,
      data: [{value: 19.46},{value: 17.58},{value:19.27},{value:22.16},
        {value: 24.93}]
    }
  ]);
  }
  reFresh() {
    this.ionViewDidLoad();
  }
  ionViewWillEnter() {
    this.isHere = true;
    window.addEventListener('resize',() =>this.resize());
  }
  resize() {
    if(!this.isHere) return;
    this.ionViewDidLoad();
  }
  ionViewWillLeave() {
    this.isHere = false;
  }
}
