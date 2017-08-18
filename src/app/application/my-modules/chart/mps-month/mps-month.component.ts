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
  selector: 'sg-mps-month',
  templateUrl: 'mps-month.component.html',
})
export class MpsMonthComponent {

  endTime:string = moment(new Date()).format('YYYY-MM');
  className:string = this.constructor.name;
  tableInfo:TableModel;
  subInfo: TableModel;
  mi_type:string;
  yearValues:string = ''+new Date().getFullYear();//日期控件的可选择年份
  max:string = moment(new Date()).format('YYYY-MM'); //日期控件的最大选择日期
  constructor(
    private plugin: PluginService,
    private chartService: ChartService,
    private cacheService: CacheService
  ) {  }

  async ionViewDidLoad() {
    await this.initTotal();
    setTimeout(()=>{
      this.chartService.initScroll('sg-mps-month','#mySegment')
    },100);
  }

  ionViewWillLeave() {
    this.chartService.unObserveOffsetTop();
  }

  /**
   * 渲染总图
   */
  async initTotal() {
    this.tableInfo = await this.getInfo('MSL')
    if(!this.tableInfo) return;
    this.chartService.makeChart('main1', this.chartService.optionConv(this.initOption(this.tableInfo,'MSL')));
  }

  /**
   * 根据结束时间endTime重新渲染画面
   */
  search() {
    this.initTotal();
    this.initSub();
  }

  /**
   * 渲染次级图
   */
  async initSub() {
    this.subInfo = await this.getInfo(this.mi_type)
    if(!this.subInfo) return;
    this.chartService.makeChart('main2', this.chartService.optionConv(this.initOption(this.subInfo,this.mi_type)),true);
  }

  /**
   * 更改展示的次级图
   */
  async changeShow() {
    await this.initSub();
    // 滚到次级图的顶部
    this.chartService.scroll_down();
  }

  /**
   * 初始化图配置option，及绑定数据，更新标题
   * @param  {TableModel} info 依赖的数据
   * @param  {string}     type 数据的类别名['MSL', 'MD1', 'MD2', 'MD3']
   * @return {string}          stringify后的option配置
   */
  initOption(info:TableModel,type:string) {
    let option1 = JSON.parse(OptionsConfig.MpsAchievement.option2);
    let data = info.data;
    option1.xAxis[0].data =data[0].slice(2);
    option1.series = option1.series.map((list:any,idx:number) => {
      list.data = data[idx+1].slice(2);
      if(list.data[0].indexOf('%')>-1) {
        for(let i =0;i<list.data.length;i++) {
          if(!list.data[i]) continue
          list.data[i] = list.data[i].replace('%','');
        }
      }
      return list;
    });
    let title = '';
    switch(type) {
      case 'MD1':
      title = 'MSL MFGC制造一部(MD 1)';
      break;
      case 'MD2':
      title = 'MSL MFGC制造二部(MD 2)';
      break;
      case 'MD3':
      title = 'MSL MFGC制造三部(MD 3)';
      break;
      case 'MSL':
      title = 'MSL MPS达成率';
      break;
    }
    option1.title.text = title;
    return JSON.stringify(option1);
  }

  /**
   * 获得数据
   * @param  {string} type          自定义类别名字['MSL', 'MD1', 'MD2', 'MD3']
   * @return {TableModel}           自定义表格格式
   */
  async getInfo(type:string) {
    let cache = this.cacheService.get(this.className,type);
    // 如果缓存里没有，则到服务器查找
    if(!cache) {
      let loading = this.plugin.createLoading();
      loading.present();
      cache = await this.initInfo(type);
      loading.dismiss();
      if(!cache) return;
      this.cacheService.update(this.className,type,cache);
    }
    if(cache) {
      cache = this.afterGet(cache);
    }
    return cache;
  }

  /**
   * 获取数据后的钩子函数，再处理，根据结束时间，获取最多五个月的数据
   * @param  {TableModel} tableInfo 总数据
   * @return {TableModel}           处理后的数据
   */
  afterGet(tableInfo:TableModel) {
    let data = tableInfo.data || [];
    let time = this.endTime.replace('-','');
    let month = +this.endTime.split('-')[1];
    let idx = data[0].indexOf(time);
    data = data.map((list) => {
      return list.slice(0,2).concat(list.slice(month>4?month-5+2:2,idx+1));
    })
    tableInfo.data = data;
    return tableInfo;

  }

  /**
   * 根据数据的名去服务器请求数据
   * @param  {string} type 自定义名称['MSL', 'MD1', 'MD2', 'MD3']
   * @return {TableModel}      自定义表格对象
   */
  async initInfo(type:string) {
    let all = ['MSL', 'MD1', 'MD2', 'MD3'];
    if(all.indexOf(type)<0) return;
    let res:any = await this.chartService.getMpsMonthChartInfo(type).catch((e) => {
      this.plugin.errorDeal(e);
      return '';
    })
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
