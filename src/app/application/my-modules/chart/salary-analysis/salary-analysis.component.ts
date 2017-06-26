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

  isHere:boolean;
  fontFamily:string[] = ['Helvetica', 'Tahoma', 'Arial', 'STXihei', '华文细黑', 'Microsoft YaHei', '微软雅黑', 'sans-serif'];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private plugin: PluginService,
  ) { }

  ionViewDidLoad() {
    this.initSingleYChart('main1','IDL年资分析',{
      legend_data:['工程','管理','研发','专业'],
      xAxis_data:['0-1年','1-2年','2-3年','3-4年','4-5年','5-7年','7-9年','9年以上'],
      series:[{
        name:'工程',
        type:'bar',
        data: [{value: 79},{value: 39},{value: 41},{value: 39},
          {value: 6},{value: 29},{value: 28},{value: 237}]
      },{
        name:'管理',
        type:'bar',
        data: [{value: 0},{value: 0},{value: 0},{value: 0},
          {value: 0},{value: 0},{value: 0},{value: 36}]
      },{
        name:'研发',
        type:'bar',
        data: [{value: 6},{value: 4},{value: 0},{value: 4},
          {value: 0},{value: 1},{value: 6},{value: 13}]
      },{
        name:'专业',
        type:'bar',
        data: [{value: 43},{value: 32},{value: 29},{value: 26},
          {value: 17},{value: 21},{value: 27},{value: 191}]
      }]
    });

    this.initPieChart('main2','IDL年资比例',{
      legend_data:['0-1年','1-2年','2-3年','3-4年','4-5年','5-7年','7-9年','9年以上'],
      series:[
        {
          name:'工资',
          data:[{value:128,name:'0-1年'},{value:75,name:'1-2年'},
        {value:70,name:'2-3年'},{value:69,name:'3-4年'},
        {value:23,name:'4-5年'},{value:51,name:'5-7年'},
        {value:61,name:'7-9年'},{value:477,name:'9年以上'}]
        }
       ]
    })

    this.initSingleYChart('main3','DL年资分析',{
      legend_data:['DL'],
      xAxis_data: ['0-1年','1-2年','2-3年','3-4年','4-5年','5-7年','7-9年','9年以上'],
      series:[{name:'DL',type:'bar',
      data:[{value:736},{value:200},{value:164},{value:92},
        {value:34},{value:44},{value:35},{value:55}
      ]
    }]
    })

    this.initPieChart('main4','DL年资比例',{
      legend_data:['0-1年','1-2年','2-3年','3-4年','4-5年','5-7年','7-9年','9年以上'],
      series:[
        {
          name:'工资',
          data:[{value:200,name:'1-2年'},
        {value:164,name:'2-3年'},{value:92,name:'3-4年'},
        {value:34,name:'4-5年'},{value:44,name:'5-7年'},
        {value:35,name:'7-9年'},{value:55,name:'9年以上'},{value:736,name:'0-1年'}]
        }
       ]
    })
  }
  reFresh() {
    this.ionViewDidLoad();
  }
  ionViewWillEnter() {
    this.isHere = true;
    window.addEventListener('resize',() =>this.reFresh());
  }
  resize() {

  }
  ionViewWillLeave() {
    this.isHere = false;
  }
  initSingleYChart(name: string, title: string,
    data:{
      legend_data:string[],
      xAxis_data:string[],
      series: {
        name: string,
        type: string,
        data: {
          value: number
        }[],
      }[]
    },
  color: string[] = ['#3773F7', '#EEB174'], fontFamily: string[] = this.fontFamily) {
    let myChart = echarts.init(document.getElementById(name));
    // 绘制图表
    let mySeries:any = data.series;
    mySeries[0].barGap = 0;
    myChart.setOption({
      title: {
        text: title, textStyle: {
          fontFamily: fontFamily,
          fontSize: 18
        },
        x:'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: data.legend_data,
        top: '6%',
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
      series: mySeries,
      textStyle: {
        fontFamily: fontFamily,
        fontSize: 18
      }
    });
    return myChart;
  }

  initPieChart(name: string, title: string,
    data:{
      legend_data:string[],
      series:{
        name: string,
        data:{value:number, name: string}[]
      }[]
    }
    ,fontFamily:string[] =this.fontFamily) {
    let myChart = echarts.init(document.getElementById(name));
    // 绘制图表
    let mySeries:any = data.series;
    mySeries[0].type = 'pie';
    mySeries[0].itemStyle = {
      emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    };
    mySeries[0].center =['50%','60%'];
    myChart.setOption({
    title : {
        text: title,
        textStyle: {
          fontFamily: fontFamily,
          fontSize: 18
        },
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'horizontal',
        left: 'left',
        top: '6%',
        data: data.legend_data
    },
    series : mySeries
   });
    return myChart;
  }
}
