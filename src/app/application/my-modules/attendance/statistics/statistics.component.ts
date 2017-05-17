import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as echarts from 'echarts';

import { PluginService }   from '../../../../core/services/plugin.service';
import { AttendanceService } from '../shared/service/attendance.service';

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
  OTday:any;
  leaveDay:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private plugin: PluginService,
    private attendanceService: AttendanceService
  ) { }

  async ionViewDidLoad() {
    this.initDays();
    let loading = this.plugin.createLoading();
    loading.present()
    await this.editMonthLeave();
    await this.editMonthOT();
    loading.dismiss()
    this.initChart2('main', '总统计');
    this.initOTMonthChart();
    this.initLeaveMonthChart();
  }
  async editMonthLeave() {
    let res: any = await this.attendanceService.getOffDutyTotalDays();
    if (res.status) {
      this.myLeave = res.content.slice(0,new Date().getMonth()+1);
      let nowMonthLeave = this.myLeave[this.myLeave.length-1]
      this.totalLeave.map((item) => {
        if(item.name == '本月请假') {
          item.value = nowMonthLeave.value;
        } else {
          let totalCount = 0;
          for(let i=0;i<this.myLeave.length;i++) {
            totalCount = totalCount + Number(this.myLeave[i].value)
          }
          item.value = totalCount;
        }
        return item;
      })
    }
  }
  initDays() {
    let date = new Date();
    let monthDays = new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
    let days = []
    for(let i=0;i<monthDays+1;i++) {
      days.push({name:i+1,value:0});
    }
    this.OTday = this.leaveDay = days;
  }
  async editMonthOT() {
    let res: any = await this.attendanceService.getOverTimeTotalHours();
    if (res.status) {
      this.myOT = res.content.slice(0,new Date().getMonth()+1);
      let nowMonthOT = this.myOT[this.myOT.length-1];
      this.totalOT.map((item) => {
        if(item.name == '本月加班') {
          item.value = nowMonthOT.value;
        } else {
          let totalCount = 0;
          for(let i=0;i<this.myOT.length;i++) {
            totalCount = totalCount + Number(this.myOT[i].value)
          }
          item.value = totalCount;
        }
        return item;
      })
    }
  }
  initOTMonthChart() {
    let monthChart = this.initChart1('main2', '我的加班', this.myOT, true);
    monthChart.on('click', (params: any) => {
      this.attendanceService.getOverTimeMonthHours(params.dataIndex+1).then((res) => {
        if(res.status) {
          let data = res.content;
          for(let i = 0;i<data.length;i++) {
            this.OTday = this.OTday.map((item:any) => {
              if(item.name == data[i].name) {
                item.value = data[i].value;
              }
              return item;
            })
          }
          this.initLineChat('main2', (params.dataIndex + 1) + '月加班', this.OTday, true, this.initOTMonthChart);
        }
      })

    })
  }
  initLeaveMonthChart() {
    let monthChart = this.initChart1('main3', '我的请假', this.myLeave, true);
    monthChart.on('click', (params: any) => {
      this.attendanceService.getOffDutyMonthHours(params.dataIndex+1).then((res) => {
        if(res.status) {
          let data = res.content;
          for(let i = 0;i<data.length;i++) {
            this.leaveDay = this.leaveDay.map((item:any) => {
              if(item.name == data[i].name) {
                item.value = data[i].value;
              }
              return item;
            })
          }
          this.initLineChat('main3', (params.dataIndex + 1) + '月请假', this.leaveDay, true, this.initLeaveMonthChart);
        }
      })
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
