import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import * as echarts from 'echarts';

import { PluginService }   from '../../../../core/services/plugin.service';


@IonicPage()
@Component({
  selector: 'sg-salary-analysis',
  templateUrl: 'salary-analysis.component.html'
})
export class SalaryAnalysisComponent {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private plugin: PluginService,
  ) { }

  ionViewDidLoad() {
    this.initChart2('main1','test',{
      legend_data:['生成','gg'],
      xAxis_data:['管理','研发','工程','专业'],
      series:[{
        name:'生成',
        type:'bar',
        data: [{
          name: '本月',
          value: 100
        },
        {
          name: '本年',
          value: 189
        }]
      },{
        name:'gg',
        type:'bar',
        data: [{
          name: '本月',
          value: 20
        },
        {
          name: '本年',
          value: 589
        }]
      }]
    })
  }
  ionViewWillEnter() {

  }
  resize() {

  }
  ionViewWillLeave() {

  }
  initChart2(name: string, title: string,
    data:{
      legend_data:string[],
      xAxis_data:string[],
      series: {
        name: string,
        type: string,
        data: {
          name: string;
          value: number
        }[],
      }[]
    },
  color: string[] = ['#3773F7', '#EEB174'], fontFamily: string[] = ['Helvetica', 'Tahoma', 'Arial', 'STXihei', '华文细黑', 'Microsoft YaHei', '微软雅黑', 'sans-serif']) {
    let myChart = echarts.init(document.getElementById(name));
    // 绘制图表
    myChart.setOption({
      title: {
        text: title, top: '3%', textStyle: {
          fontFamily: fontFamily,
          fontSize: 18
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: data.legend_data,
        textStyle: {
          fontFamily: fontFamily,
          fontSize: 16
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: data.xAxis_data,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: data.series,
      textStyle: {
        fontFamily: fontFamily,
        fontSize: 18
      }
    });
    return myChart;
  }
}
