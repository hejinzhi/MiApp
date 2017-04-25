import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as echarts from 'echarts';

class Chart {
  name: string;
  value: number
}
@Component({
  selector: 'sg-statistics',
  templateUrl: 'statistics.component.html'
})
export class StatisticsComponent {

  totalOT=[
    {name:'本月加班',value:14},
    {name:'本年加班',value:36}
  ]
  totalLeave=[
    {name:'本月请假',value:2.3},
    {name:'本年请假',value:15.7}
  ]
  myOT=[
    {name:'1月',value:1},
    {name:'2月',value:2},
    {name:'3月',value:3},
    {name:'4月',value:4},
    {name:'5月',value:5},
    {name:'6月',value:6},
    {name:'7月',value:7},
    {name:'8月',value:8},
    {name:'9月',value:9},
    {name:'10月',value:10},
    {name:'11月',value:11},
    {name:'12月',value:12}
  ]
  myLeave=[
    {name:'1月',value:1},
    {name:'2月',value:2},
    {name:'3月',value:3},
    {name:'4月',value:4},
    {name:'5月',value:5},
    {name:'6月',value:6},
    {name:'7月',value:7},
    {name:'8月',value:8},
    {name:'9月',value:9},
    {name:'10月',value:10},
    {name:'11月',value:11},
    {name:'12月',value:12}
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    this.initChart2('main','总统计');
    this.initChart1('main2','我的加班', this.myOT);
    this.initChart1('main3','我的请假', this.myLeave);
  }

  initChart1(name: string, title: string, target: Chart[],color:string='#3773F7',fontFamily:string[]=['Helvetica','Tahoma','Arial','STXihei','华文细黑','Microsoft YaHei','微软雅黑','sans-serif' ]) {
    let dataName = target.map((item) => {
      return item.name
    })
    let myChart = echarts.init(document.getElementById(name));
    // 绘制图表
    myChart.setOption({
      title: {
        text: title, top: '3%', textStyle: {
          fontFamily:fontFamily,
          fontSize: 25
        }
      },
      tooltip: {
        trigger: 'axis',
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
          data: dataName,
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
      series: [
        {
          type: 'bar',
          barWidth: '60%',
          data: target,
          color:[color],
          label: {
            normal:
            {
              show: true,
              position: 'top',
            } },
        }
      ],
      textStyle: {
        fontFamily:fontFamily,
        fontSize:18
      }
    });
  }

  initChart2(name: string, title: string,color:string[]=['#3773F7','#EEB174'],fontFamily:string[]=['Helvetica','Tahoma','Arial','STXihei','华文细黑','Microsoft YaHei','微软雅黑','sans-serif' ]) {
    let myChart = echarts.init(document.getElementById(name));
    // 绘制图表
    myChart.setOption({
      title: {
        text: title, top: '3%', textStyle: {
          fontFamily:fontFamily,
          fontSize: 25
        }
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data:['加班', '请假']
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
          data: ['本月','本年'],
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
      color:color,
      series: [
        {
          name:'加班',
          type: 'bar',
          data: this.totalOT,
          label: {
            normal:
            {
              show: true,
              position: 'top',
              formatter: '{c}小时'
            } },
        },
        {
          name:'请假',
          type: 'bar',
          data: this.totalLeave,
          label: {
            normal:
            {
              show: true,
              position: 'top',
              formatter: '{c}天'
            } },
        }
      ],
      textStyle: {
        fontFamily:fontFamily,
        fontSize:18
      }
    });
  }
}
