import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { PluginService }   from '../../../../core/services/plugin.service';
import { ChartService } from '../shared/service/chart.service';

import { OptionsConfig } from '../shared/config/options.config';
import { TableModel } from '../shared/model/table.model';

@IonicPage()
@Component({
  selector: 'sg-dimission-analysis',
  templateUrl: 'dimission-analysis.component.html'
})

export class DimissionAnalysisComponent {

  wholeInfo:TableModel;//总数据
  subInfo:TableModel;//下一级的数据
  mi_type:string;//选择的下一级类型

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private plugin: PluginService,
    private chartService: ChartService
  ) { }

  async ionViewDidLoad() {
    let loading = this.plugin.createLoading();
    loading.present();
    this.wholeInfo = await this.initInfo('T');
    loading.dismiss();
    this.makeChart('main1', this.wholeInfo,1);
    setTimeout(()=>{
      this.chartService.initScroll('sg-dimission-analysis','#mySegment')
    },100);
  }

  ionViewWillLeave() {
    this.chartService.unObserveOffsetTop();
  }
  /**
   * 根据选择的标签更改视图
   */
  async changeShow() {
    this.subInfo = {caption:'',data:[]}
    this.subInfo = await this.initInfo(this.mi_type);
    if(this.mi_type === 'S+A') {
      let lastOrder;//倒数第几的位置
      let data = this.subInfo.data
      // 查找最大年份的位置
      for(let i =data.length-1;i>0;i--) {
        if(!isNaN(Number(data[i][0]))) {
          lastOrder = data.length-i;
          break;
        }
      }
      this.makeChart('main2',this.subInfo,lastOrder,true);
    }else {
      this.makeChart('main2',this.subInfo,1,true);
    }
    this.chartService.scroll_down();
  }

  /**
   * 渲染图表
   * @param  {string}     id        dom的id
   * @param  {TableModel} tableInfo      总数据
   * @param  {number}     lastOrder 所需数据为倒数第几个往上开始
   * @param  {boolean}    setHeight 是否再次设置高度（dom被div等包住时无法使用自适应高度），默认为false
   */
  makeChart(id:string, tableInfo:TableModel ,lastOrder:number, setHeight:boolean = false) {
    let option = JSON.parse(OptionsConfig.DimissionAnalysis.option1);
    let infoLength = tableInfo.data.length;
    let legend:string[]= [];
    option.series = option.series.map((item:any,index:number) => {
      let target = tableInfo.data[infoLength-index-lastOrder];
      item.name = target[0]
      legend.push(item.name);
      item.data =  item.data.map((subList:any,idx:number) => {
        subList.value = target[idx+1]?target[idx+1]:'0';
        return subList;
      })
      return item;
    })
    option.legend.data = legend.reverse();
    option.title.text = tableInfo.caption.substr(0,tableInfo.caption.length-3)
    this.chartService.makeChart(id,this.chartService.optionConv(JSON.stringify(option)),setHeight);
  }

  /**
   * 根据类别获得各table的离职率信息
   * @param  {string} type T是总公司，DL是直接员工，IDL是间接员工，SA是绩效高的员工
   * @return {Promise<TableModel>}      自定义的table格式
   */
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
      case 'S+A':
      title = 'S+A离职率(%)';
      break;
    }
    let res:any = await this.chartService.getDimissionChartInfo(type).catch((e) => {
      this.plugin.errorDeal(e);
    });
    let data = res.json().map((list:any) => {
      return this.chartService.changeObjectToArray(list);
    })
    return {
      caption:title,
      data:data
    }
  }

}
