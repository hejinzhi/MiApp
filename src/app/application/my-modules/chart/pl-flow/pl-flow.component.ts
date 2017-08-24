import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { PluginService }   from '../../../../core/services/plugin.service';
import { ChartService } from '../shared/service/chart.service';
import { CacheService } from '../../../../core/services/cache.service';

import { OptionsConfig } from '../shared/config/options.config';
import { TableModel } from '../shared/model/table.model';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'sg-pl-flow',
  templateUrl: 'pl-flow.component.html',
})
export class PlFlowComponent {

  endTime:string = moment(new Date()).format('YYYY-MM-DD');
  className:string = this.constructor.name;
  tableInfo:TableModel;
  subInfo: TableModel;
  mi_type:string;
  yearValues:string = ''+new Date().getFullYear();//日期控件的可选择年份
  max:string = moment(new Date()).format('YYYY-MM-DD'); //日期控件的最大选择日期

  deptMes:{id:number,name:string}[] =[
    {id:82,name:'MSL MC MDⅡ 生產二處Backend生產一課'},
    {id:81,name:'MSL MC MD I製造一處'},
    {id:101,name:'MSL MC MDⅡ 生產二處Backend生產二課'},
    {id:121,name:'MSL MC MDⅢ PCBA生產制造'},
    {id:141,name:'系統一處'},
    {id:161,name:'系統二處'},
    {id:162,name:'系統三處'},
    {id:1,name:'MSL MC MD I 製造二處'},
    {id:181,name:'MSL MC MD I Bose制造處'},
    {id:102,name:'MSL MC MDⅡ NPI生產處'}
  ]
  constructor(
    private plugin: PluginService,
    private chartService: ChartService,
    private cacheService: CacheService
  ) {

  }

  async ionViewDidLoad() {
    this.tableInfo = await this.initInfo(1);
    if(!this.tableInfo) return;
  }
  search() {

  }

  async initInfo(deptID:number) {
    let res:any = await this.chartService.getPlFlowChartInfo(this.endTime.replace(/\-/g,''),deptID).catch((e) => {
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
