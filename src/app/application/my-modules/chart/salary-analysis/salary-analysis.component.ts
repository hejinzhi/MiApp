import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { PluginService }   from '../../../../core/services/plugin.service';
import { ChartService } from '../shared/service/chart.service';

import { OptionsConfig } from '../shared/config/options.config';

@IonicPage()
@Component({
  selector: 'sg-salary-analysis',
  templateUrl: 'salary-analysis.component.html'
})
export class SalaryAnalysisComponent {

  tableInfo:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private plugin: PluginService,
    private chartService: ChartService
  ) { }

  changeObjectToArray(obj:Object) {
    let arr = [];
    for(let item in obj){
        arr.push(obj[item]);
    }
    return arr;
  }
  async ionViewDidLoad() {
    let loading = this.plugin.createLoading();
    loading.present();
    await this.initInfo();
    loading.dismiss();
    let wholeData = this.tableInfo.data;
    this.chartService.makeChart('main1', this.chartService.optionConv(this.initOption1(wholeData)))
    this.chartService.makeChart('main2', this.chartService.optionConv(this.initOption2(wholeData)))
    this.chartService.makeChart('main3', this.chartService.optionConv(this.initOption3(wholeData)))
    this.chartService.makeChart('main4', this.chartService.optionConv(this.initOption4(wholeData)))
  }
  initOption1(wholeData:string[][]) {
    let option1 = JSON.parse(OptionsConfig.salaryAnalysis.option1);
    option1.series = option1.series.map((list:any,index:number) => {
      let target = wholeData[index+1];
      list.data =  list.data.map((subList:any,idx:number) => {
        subList.value = target[idx+1];
        return subList;
      })
      return list;
    })
    return JSON.stringify(option1);
  }
  initOption2(wholeData:string[][]) {
    let option2 = JSON.parse(OptionsConfig.salaryAnalysis.option3);
    let target = wholeData[6];
    option2.series[0].data = option2.series[0].data.map((list:any,index:number) => {
      list.value = target[index+1];
      return list;
    })
    option2.title.text = 'IDL 年资比例';
    return JSON.stringify(option2);
  }

  initOption3(wholeData:string[][]) {
    let option3 = JSON.parse(OptionsConfig.salaryAnalysis.option2);
    let target = wholeData[5];
    option3.series[0].data = option3.series[0].data.map((list:any,index:number) => {
      list.value = target[index+1];
      return list;
    })
    return JSON.stringify(option3);
  }

  initOption4(wholeData:string[][]) {
    let option4 = JSON.parse(OptionsConfig.salaryAnalysis.option3);
    let target = wholeData[5];
    option4.series[0].data = option4.series[0].data.map((list:any,index:number) => {
      list.value = target[index+1];
      return list;
    })
    option4.title.text = 'DL 年资比例';
    return JSON.stringify(option4);
  }

  async initInfo() {
    await this.chartService.getSalaryChartInfo().then((res) => {
      let data = res.json().map((list:any) => {
        return this.changeObjectToArray(list);
      })
      this.tableInfo = {
        caption:'',
        data: data
      }
    }).catch((e) => {
      this.plugin.errorDeal(e);
    })
  }
  reFresh() {
    this.ionViewDidLoad();
  }
}
