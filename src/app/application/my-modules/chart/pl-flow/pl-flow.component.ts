import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

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

  endTime:string = moment(Date.parse(new Date().toString())-60*60*24*1000).format('YYYY-MM-DD');
  className:string = this.constructor.name;
  tableInfo:TableModel;
  yearValues:string = ''+new Date().getFullYear();//日期控件的可选择年份
  max:string = moment(Date.parse(new Date().toString())-60*60*24*1000).format('YYYY-MM-DD'); //日期控件的最大选择日期
  defaultDeptID:number =1;
  translateTexts: any = {};
  deptMes:{id:number,name:string}[];
  constructor(
    private plugin: PluginService,
    private chartService: ChartService,
    private cacheService: CacheService,
    private translate: TranslateService
  ) {

  }

  async ionViewDidLoad() {
    this.subscribeTranslateText();
    this.deptMes = [
      {id:82,name:this.translateTexts['chart.dept82']},
      {id:81,name:this.translateTexts['chart.dept81']},
      {id:101,name:this.translateTexts['chart.dept101']},
      {id:141,name:this.translateTexts['chart.dept141']},
      {id:161,name:this.translateTexts['chart.dept161']},
      {id:162,name:this.translateTexts['chart.dept162']},
      {id:1,name:this.translateTexts['chart.dept1']},
      {id:181,name:this.translateTexts['chart.dept181']},
      {id:102,name:this.translateTexts['chart.dept102']}
    ];
    this.render();
  }

  /**
   * 获得i18n的翻译信息
   */
  subscribeTranslateText() {
    this.translate.get(['chart.dept1', 'chart.dept82', 'chart.dept81',
    'chart.dept101', 'chart.dept141', 'chart.dept161',
    'chart.dept162', 'chart.dept181', 'chart.dept102'
  ]).subscribe((res) => {
        this.translateTexts = res;
      })
  }

  /**
   * 渲染画面（图和表）
   */
  async render() {
    let raw = await this.getInfo();
    this.tableInfo = JSON.parse(this.plugin.chineseConv(raw));
    if(!this.tableInfo) return;
    this.makeChart()
  }

  /**
   * 获得所需要的数据
   */
  async getInfo() {
    let type = this.endTime+'#'+this.defaultDeptID;
    let cache = this.cacheService.get(this.className,type);
    // 如果缓存里没有，则到服务器查找
    if(!cache) {
      let loading = this.plugin.createLoading();
      loading.present();
      cache = await this.initInfo();
      loading.dismiss();
      this.cacheService.update(this.className,type,cache);
    }
    return cache;
  }

  /**
   * 搜索条件改变后触发
   */
  search() {
    this.render();
  }

  /**
   * 绑定数据及画图
   */
  makeChart() {
    let option = JSON.parse(OptionsConfig.PlFlow.option1);
    let data = this.tableInfo.data;
    option.title.text = data[1][0];
    option.xAxis[0].data = data[0].slice(2).map((i:string) => i.slice(2));
    option.series = option.series.map((item:any,index:number) => {
      let target = data[index+1];
      item.name = target[1]
      item.data =  item.data.map((subList:any,idx:number) => {
        subList.value = target[idx+2]?target[idx+2]:'0';
        subList.value = subList.value.replace(/\,/g,'');
        return subList;
      })
      return item;
    })
    this.chartService.makeChart('main1',this.chartService.optionConv(JSON.stringify(option)));
  }

  /**
   * 向服务器请求数据
   * @return {TableModel} 自定义表格格式
   */
  async initInfo() {
    let res:any = await this.chartService.getPlFlowChartInfo(this.endTime.replace(/\-/g,''),this.defaultDeptID).catch((e) => {
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
