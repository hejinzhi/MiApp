import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { PluginService }   from '../../../../core/services/plugin.service';
import { ChartService } from '../shared/service/chart.service';

import { OptionsConfig } from '../shared/config/options.config';

@IonicPage()
@Component({
  selector: 'sg-dimission-analysis',
  templateUrl: 'dimission-analysis.component.html'
})
export class DimissionAnalysisComponent {

  tableInfo:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private plugin: PluginService,
    private chartService: ChartService
  ) { }

  async ionViewDidLoad() {

  }


  /**
   * 将对象转换为数组
   * @param  {Object} obj 对象
   * @return {Array}     数组
   */
  changeObjectToArray(obj:Object):any[] {
    let arr = [];
    for(let item in obj){
        arr.push(obj[item]);
    }
    return arr;
  }

  async initInfo(type:string) {
    let title = '';
    switch(type){
      case 'T':
      title = '年度离职率(%)';
      break;
      case 'DL':
      title = 'DL离职率(%)';
      break;
      case 'IDL':
      title = 'IDL离职率(%)';
      break;
      case 'SA':
      title = 'S+A离职率(%)';
      break;
    }
    let res:any = await this.chartService.getDimissionChartInfo(type).catch((e) => {
      this.plugin.errorDeal(e);
    });
    let data = res.json().map((list:any) => {
      return this.changeObjectToArray(list);
    })
    return {
      caption:title,
      data:data
    }
  }

}
