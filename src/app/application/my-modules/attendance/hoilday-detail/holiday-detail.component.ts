import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as echarts from 'echarts';

class Chart {
  name:string;
  value:number
}
@Component({
  selector: 'sg-hoilday-detail',
  templateUrl: 'holiday-detail.component.html'
})
export class HoildayDetailComponent {

  availableHoliday = {
    year: 5,
    day: 2,
    hour: 3
  }

  myAvailableHoliday:Chart[]= [
    { value: 5, name: '年休假天数' },
    { value: 3, name: '补休时数' },
    { value: 2, name: '补假时数' },
  ]
  uesdHoliday:Chart[] = [{
    name: '事假',
    value: 5
  },
    { name: '病假', value: 4 },
    { name: '公假', value: 3 },
    { name: '補假', value: 2 },
    { name: '补休', value: 1 },
    { name: '停线', value: 0 },
    { name: '婚假', value: 0 },
    { name: '产假', value: 0 },
    { name: '陪产假', value: 0 },
    { name: '授乳假', value: 5 },
    { name: '曠職', value: 0 },
    { name: '流產假', value: 0 },
    { name: '喪假', value: 0 },
    { name: '工傷', value: 0 }]
  OTCount:Chart = {name: '天数', value: 4.2}
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    // this.initChart('main','可休假天数', this.myAvailableHoliday);
    // this.initChart('main2','已休假天数', this.uesdHoliday);
    this.myAvailableHoliday = this.myAvailableHoliday.filter((item) =>{
      if(item.value>0) {
        return item
      }
    })
    this.uesdHoliday = this.uesdHoliday.filter((item) =>{
      if(item.value>0) {
        return item
      }
    })
  }

  initChart(name:string,title:string,target:Chart[]){
    let data = target.filter((item) =>{
      if(item.value>0) {
        return item
      }
    })
    let dataName = data.map((item) =>{
      return item.name
    })
    let myChart = echarts.init(document.getElementById(name));
    // 绘制图表
    myChart.setOption({
      title: { text: title,top: '3%',textStyle: {
        fontSize:25
      }},
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'right',
        top: '3%',
        data: dataName,
        textStyle: {
          fontSize:14
        }
      },
      series: [
        {
          name: '详情',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: data,
          animationDuration:2000,
          animationDelay:300
        }
      ]
    });
  }
}
