import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { PluginService }   from '../../../../core/services/plugin.service';
import { ChartService } from '../shared/service/chart.service';
import { CacheService } from '../../../../core/services/cache.service';

import { OptionsConfig } from '../shared/config/options.config';
import { TableModel } from '../shared/model/table.model';

@IonicPage()
@Component({
  selector: 'sg-mps-day',
  templateUrl: 'mps-day.component.html',
})
export class MpaDayComponent {

  tableInfo:TableModel;
  className:string = this.constructor.name;

  constructor(
    private plugin: PluginService,
    private chartService: ChartService,
    private cacheService: CacheService
  ) {  }

  async ionViewDidLoad() {
    this.tableInfo = await this.getInfo();
    if(!this.tableInfo) return;
    this.chartService.makeChart('main1', this.chartService.optionConv(this.initOption(this.tableInfo)));
  }
  /**
   * 获得数据
   * @param  {string} type          自定义类别名字
   * @return {TableModel}           自定义表格格式
   */
  async getInfo(type:string ='T') {
    let cache = this.cacheService.get(this.className,type);
    // 如果缓存里没有，则到服务器查找
    if(!cache) {
      let loading = this.plugin.createLoading();
      loading.present();
      cache = await this.initInfo();
      loading.dismiss();
      if(!cache) return;
      this.cacheService.update(this.className,type,cache);
    }
    return cache;
  }

  /**
   * 初始化達成率柱状折现图配置
   * @param  {TableModel} info 总数据
   * @return {option}          echars配置
   */
  initOption(info:TableModel) {
    let option1 = JSON.parse(OptionsConfig.MpsAchievement.option1);
    this.tableInfo.data.slice(1).forEach((list,idx:number) => {
      list.slice(2,3).forEach((str,subIdx:number) => {
        let target = option1.series[subIdx];
        if(!target) return;
        option1.series[subIdx].data[idx].value = str.replace('%','');
      })
    })
    return JSON.stringify(option1);
  }

  /**
   * 到服务器请求达成率日报数据
   * @return {TableModel} 自定义表格格式
   */
  async initInfo() {
    let res:any = await this.chartService.getMpsDayChartInfo().catch((e) => {
      this.plugin.errorDeal(e)
      return '';
    });
    if(!res) return;
    let data = res.json().map((list:any) => {
      return this.chartService.changeObjectToArray(list);
    })
    return {
      caption:'',
      data:data
    }
  }
}
