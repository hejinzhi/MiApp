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

  totalOT = [
    { name: '本月加班', value: 14 },
    { name: '本年加班', value: 36 }
  ]
  totalLeave = [
    { name: '本月请假', value: 2.3 },
    { name: '本年请假', value: 15.7 }
  ]
  myOT = [
    { name: '1月', value: 1 },
    { name: '2月', value: 2 },
    { name: '3月', value: 3 },
    { name: '4月', value: 4 },
    { name: '5月', value: 5 },
    { name: '6月', value: 6 },
    { name: '7月', value: 7 },
    { name: '8月', value: 8 },
    { name: '9月', value: 9 },
    { name: '10月', value: 10 },
    { name: '11月', value: 11 },
    { name: '12月', value: 12 }
  ]
  myLeave = [
    { name: '1月', value: 1 },
    { name: '2月', value: 2 },
    { name: '3月', value: 3 },
    { name: '4月', value: 4 },
    { name: '5月', value: 5 },
    { name: '6月', value: 6 },
    { name: '7月', value: 7 },
    { name: '8月', value: 8 },
    { name: '9月', value: 9 },
    { name: '10月', value: 10 },
    { name: '11月', value: 11 },
    { name: '12月', value: 12 }
  ]
  OTday = [
    { name: '1', value: 1 },
    { name: '2', value: 2 },
    { name: '3', value: 3 },
    { name: '4', value: 7 },
    { name: '5', value: 5 },
    { name: '6', value: 6 },
    { name: '7', value: 8 },
    { name: '8', value: 8 },
    { name: '9', value: 9 },
    { name: '10', value: 10 },
    { name: '11', value: 11 },
    { name: '12', value: 12 },
    { name: '13', value: 1 },
    { name: '14', value: 2 },
    { name: '15', value: 3 },
    { name: '16', value: 4 },
    { name: '17', value: 10 },
    { name: '18', value: 6 },
    { name: '19', value: 7 },
    { name: '20', value: 8 },
    { name: '21', value: 9 },
    { name: '22', value: 10 },
    { name: '23', value: 11 },
    { name: '24', value: 12 },
    { name: '25', value: 4 },
    { name: '26', value: 5 },
    { name: '27', value: 6 },
    { name: '28', value: 7 },
    { name: '29', value: 8 },
    { name: '30', value: 9 },
    { name: '31', value: 10 }
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    this.initChart2('main', '总统计');
    this.initOTMonthChart();
    this.initLeaveMonthChart();
  }
  initOTMonthChart() {
    let monthChart = this.initChart1('main2', '我的加班', this.myOT, true);
    monthChart.on('click', (params: any) => {
      this.initLineChat('main2', (params.dataIndex + 1) + '月加班', this.OTday, true, this.initOTMonthChart);
    })
  }
  initLeaveMonthChart() {
    let monthChart = this.initChart1('main3', '我的请假', this.myLeave, true);
    monthChart.on('click', (params: any) => {
      this.initLineChat('main3', (params.dataIndex + 1) + '月请假', this.OTday, true, this.initLeaveMonthChart);
    })
  }
  initChart1(name: string, title: string, target: Chart[], showTool: boolean = false, color: string = '#3773F7', fontFamily: string[] = ['Helvetica', 'Tahoma', 'Arial', 'STXihei', '华文细黑', 'Microsoft YaHei', '微软雅黑', 'sans-serif']) {
    let dataName = target.map((item) => {
      return item.name
    })
    let myChart = echarts.init(document.getElementById(name));
    let that = this;
    // 绘制图表
    myChart.setOption({
      title: {
        text: title, top: '3%', textStyle: {
          fontFamily: fontFamily,
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
      toolbox: {
        show: showTool,
        right: '5%',
        top: '4%',
        feature: {
          restore: { show: false },
          magicType: {
            show: true,
            type: ['line', 'bar']
          },
        }
      },
      series: [
        {
          name: '天数',
          type: 'bar',
          barWidth: '60%',
          data: target,
          color: [color],
          label: {
            normal:
            {
              show: true,
              position: 'top',
            }
          },
        }
      ],
      textStyle: {
        fontFamily: fontFamily,
        fontSize: 18
      }
    });
    return myChart;
  }

  initChart2(name: string, title: string, color: string[] = ['#3773F7', '#EEB174'], fontFamily: string[] = ['Helvetica', 'Tahoma', 'Arial', 'STXihei', '华文细黑', 'Microsoft YaHei', '微软雅黑', 'sans-serif']) {
    let myChart = echarts.init(document.getElementById(name));
    // 绘制图表
    myChart.setOption({
      title: {
        text: title, top: '3%', textStyle: {
          fontFamily: fontFamily,
          fontSize: 25
        }
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['加班', '请假']
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
          data: ['本月', '本年'],
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
      color: color,
      series: [
        {
          name: '加班',
          type: 'bar',
          data: this.totalOT,
          label: {
            normal:
            {
              show: true,
              position: 'top',
              formatter: '{c}小时'
            }
          },
        },
        {
          name: '请假',
          type: 'bar',
          data: this.totalLeave,
          label: {
            normal:
            {
              show: true,
              position: 'top',
              formatter: '{c}天'
            }
          },
        }
      ],
      textStyle: {
        fontFamily: fontFamily,
        fontSize: 18
      }
    });
    return myChart;
  }

  initLineChat(name: string, title: string, target: Chart[], showTool: boolean = false, fn:any,color: string[] = ['#3773F7', '#EEB174'], fontFamily: string[] = ['Helvetica', 'Tahoma', 'Arial', 'STXihei', '华文细黑', 'Microsoft YaHei', '微软雅黑', 'sans-serif']) {
    let dataName = target.map((item) => {
      return item.name
    })
    let myChart = echarts.init(document.getElementById(name));
    let that = this;
    // 绘制图表
    myChart.setOption({
      title: {
        text: title, top: '3%', textStyle: {
          fontFamily: fontFamily,
          fontSize: 25
        }
      },
      tooltip: {
        trigger: 'item'
      },
      xAxis: [
        {
          type: 'category',
          data: dataName,
          boundaryGap: false
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      color: color,
      toolbox: {
        show: showTool,
        right: '5%',
        top: '6%',
        feature: {
          restore: { show: false },
          magicType: {
            show: true,
            type: ['line', 'bar']
          },
          myTool: {
            show: true,
            title: '返回',
            icon: 'image://assets/img/back.png',
            onclick() {
              fn.apply(that);
            }
          }
        }
      },
      series: [
        {
          type: 'line',
          data: target
        }
      ],
      textStyle: {
        fontFamily: fontFamily,
        fontSize: 18
      }
    });
    return myChart;
  }
}
