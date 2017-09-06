import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import * as echarts from 'echarts';

import { PluginService }   from '../../../../core/services/plugin.service';
import { AttendanceService } from '../shared/service/attendance.service';

import { LanguageTypeConfig } from '../shared/config/language-type.config';

class Chart {
  name: string;
  value: number
}

@IonicPage()
@Component({
  selector: 'sg-statistics',
  templateUrl: 'statistics.component.html'
})
export class StatisticsComponent {

  fontType:string = localStorage.getItem('languageType')
  fontContent = LanguageTypeConfig.statisticsComponent[this.fontType];

  totalOT:any[];
  totalLeave:any[];
  myOT:{name:string,value:number}[]
  myLeave:{name:string,value:number}[]
  caches:any;
  isHere:boolean;
  translateTexts: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private plugin: PluginService,
    private attendanceService: AttendanceService,
    private translate: TranslateService
  ) { }

  ionViewDidLoad() {
    this.subscribeTranslateText();
    this.totalOT = [
      { name: this.translateTexts['attendance.totalOT_month'], value: 0 },
      { name: this.translateTexts['attendance.totalOT_year'], value: 0 }
    ];
    this.totalLeave = [
      { name: this.translateTexts['attendance.totalLeave_month'], value: 0 },
      { name: this.translateTexts['attendance.totalLeave_year'], value: 0 }
    ]
    this.caches = this.initCache();
    this.reFresh(false);
  }
  ionViewWillEnter() {
    this.isHere = true;
    window.addEventListener('resize',() =>this.resize())
  }

  subscribeTranslateText() {
    this.translate.get(['attendance.totalOT_year', 'attendance.totalOT_month', 'attendance.totalLeave_year', 'attendance.totalLeave_month',
      'attendance.total', 'attendance.OT', 'attendance.leave1', 'attendance.month', 'attendance.day','attendance.my',
    'attendance.days', 'attendance.hour', 'attendance.this_year', 'attendance.this_month', 'attendance.back']).subscribe((res) => {
        this.translateTexts = res;
      })
  }

  resize() {
    if(!this.isHere) return;
    this.initChart2('main', this.translateTexts['attendance.total']);
    this.initOTMonthChart();
    this.initLeaveMonthChart();
  }
  ionViewWillLeave() {
    this.isHere = false;
  }

  initCache() {
    let util = {
      initDays(month:number | string) {
        let date = new Date();
        let monthDays = new Date(date.getFullYear(),Number(month),0).getDate();
        let days:{name:string,value:number}[]= []
        for(let i=0;i<monthDays;i++) {
          days.push({name:i+1+'',value:0});
        }
        return days;
      },
      attendanceService:this.attendanceService
    }
    let __cache__ ={
      cache:{
        myOTday:{
        },
        myLeaveDay:{

        }
      },
      user: {},
      init() {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.cache = this.user.att_days?this.user.att_days:{};
      },
      clear() {
        localStorage.setItem('att_days','{}');
      },
      update(){
        this.user.att_days = this.cache;
        localStorage.setItem('currentUser', JSON.stringify(this.user));
      },
      // 1:OT; 2:Leave
      get(type:number,month:string,load:boolean = false) {
        this.init();
        let data
        if(type ===1) {
          this.cache.myOTday = this.cache.myOTday || {};
          data = this.cache.myOTday[month];
        }else {
          this.cache.myLeaveDay = this.cache.myLeaveDay || {};
          data = this.cache.myLeaveDay[month];
        }
        if(!load && data) {
          return Promise.resolve(data);
        } else {
          return this.load(type,month)
        }
      },
      load(type:number,month:string){
        if(type ===1) {
          return this.loadOT(month);
        }else {
          return this.loadLeave(month);
        }
      },
      loadOT(month:string) {
        return util.attendanceService.getOverTimeMonthHours(month).then((res:any) => {
          let newData = []
          if(res.status) {
            let data = res.content;
            newData = util.initDays(month);
            for(let i = 0;i<data.length;i++) {
              newData = newData.map((item:any) => {
                if(item.name == data[i].name) {
                  item.value = data[i].value;
                }
                return item;
              })
            }
            this.cache.myOTday = this.cache.myOTday || {};
            this.cache.myOTday[month] = newData;
            this.update();
          }
          return Promise.resolve(newData);
        })
      },
      loadLeave(month:string) {
        return util.attendanceService.getOffDutyMonthHours(month).then((res:any) => {
          let newData = []
          if(res.status) {
            let data = res.content;
            newData = util.initDays(month);
            for(let i = 0;i<data.length;i++) {
              newData = newData.map((item:any) => {
                if(item.name == data[i].name) {
                  item.value = data[i].value;
                }
                return item;
              })
            }
            this.cache.myLeaveDay = this.cache.myLeaveDay || {};
            this.cache.myLeaveDay[month] = newData;
            this.update();
          }
          return Promise.resolve(newData);
        })
      }
    }
    return __cache__;
  }
  async reFresh(clear:false) {
    if(clear) {
      this.caches.clear();
    }
    let loading = this.plugin.createLoading();
    loading.present()
    await this.editMonthLeave();
    await this.editMonthOT();
    loading.dismiss()
    this.initChart2('main', this.translateTexts['attendance.total']);
    this.initOTMonthChart();
    this.initLeaveMonthChart();
  }
  async editMonthLeave() {
    let res: any = await this.attendanceService.getOffDutyTotalDays();
    if (res.status) {
      console.log(res);
      
      this.myLeave = res.content.slice(0,new Date().getMonth()+1);
      this.myLeave = this.zeroNotShow(this.myLeave);
      let nowMonthLeave = this.myLeave[this.myLeave.length-1]
      this.totalLeave.map((item) => {
        if(item.name == this.translateTexts['attendance.totalLeave_month']) {
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
  zeroNotShow(data:{name:string,value:number}[]) {
    return data.map((item:any) => {
      if(item.value == 0) {
        item.label={
          normal:{}
        },
        item.label.normal = {
          show:false
        }
      }
      return item;
    })
  }
  async editMonthOT() {
    let res: any = await this.attendanceService.getOverTimeTotalHours();
    if (res.status) {
      this.myOT = res.content.slice(0,new Date().getMonth()+1);
      this.myOT = this.zeroNotShow(this.myOT);
      let nowMonthOT = this.myOT[this.myOT.length-1];
      this.totalOT.map((item) => {
        if(item.name == this.translateTexts['attendance.totalOT_month']) {
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
    let monthChart = this.initChart1('main2', this.translateTexts['attendance.my']+this.translateTexts['attendance.OT'], this.myOT, true, this.translateTexts['attendance.hour']);
    monthChart.on('click', (params: any) => {
      let month = params.dataIndex+1;
      let load = new Date().getMonth() === (month-1)? true : false;
      this.caches.get(1,month,load).then((res:any) => {
        this.initLineChat('main2', month + this.translateTexts['attendance.month']+this.translateTexts['attendance.OT'], res, true, this.initOTMonthChart, this.translateTexts['attendance.hour']);
      });
    })
  }
  initLeaveMonthChart() {
    let monthChart = this.initChart1('main3', this.translateTexts['attendance.my']+this.translateTexts['attendance.leave1'], this.myLeave, true,'天');
    monthChart.on('click', (params: any) => {
      let month = params.dataIndex+1;
      let load = new Date().getMonth() === (month-1)? true : false;
      this.caches.get(2,month,load).then((res:any) => {
        this.initLineChat('main3', month + this.translateTexts['attendance.month'] + this.translateTexts['attendance.leave1'], res, true, this.initLeaveMonthChart,'天');
      });
    })
  }
  initChart1(name: string, title: string, target: Chart[], showTool: boolean = false, unit:string, color: string = '#3773F7', fontFamily: string[] = ['Helvetica', 'Tahoma', 'Arial', 'STXihei', '华文细黑', 'Microsoft YaHei', '微软雅黑', 'sans-serif']) {
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
          fontSize: 18
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: "{b} <br/>{a} : {c}"+unit,
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
          name: title.substr(2),
          type: 'bar',
          barWidth: '60%',
          data: target,
          color: [color],
          label: {
            normal:
            {
              show: true,
              position: 'top'
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
        text: title, top: '1%', textStyle: {
          fontFamily: fontFamily,
          fontSize: 18
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: [this.translateTexts['attendance.OT'], this.translateTexts['attendance.leave']],
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
            boundaryGap: true,
            data:[this.translateTexts['attendance.this_month'], this.translateTexts['attendance.this_year']],
        }
    ],
    yAxis: [
        {
            type: 'value',
            scale: true,
            name: this.translateTexts['attendance.OT'],
            min: 0,
            interval:Math.ceil(this.totalOT[1].value/4),
            max: Math.ceil(this.totalOT[1].value/4)*5,
            boundaryGap: [0.2, 0.2],
            nameTextStyle: {
              fontFamily: fontFamily,
              fontSize: 14
            }
        },
        {
            type: 'value',
            scale: true,
            name: this.translateTexts['attendance.leave'],
            nameTextStyle: {
              fontFamily: fontFamily,
              fontSize: 14
            },
            min: 0,
            interval: Math.ceil(this.totalLeave[1].value/4),
            max: Math.ceil(this.totalLeave[1].value/4)*5,
            boundaryGap: [0.2, 0.2]
        }
    ],
      color: color,
      series: [
        {
          name: this.translateTexts['attendance.OT'],
          type: 'bar',
          data: this.totalOT,
          label: {
            normal:
            {
              show: true,
              position: 'top',
              formatter: '{c}'+this.translateTexts['attendance.hour']
            }
          },
        },
        {
          name: this.translateTexts['attendance.leave1'],
          type: 'bar',
          yAxisIndex: 1,
          data: this.totalLeave,
          label: {
            normal:
            {
              show: true,
              position: 'top',
              formatter: '{c}'+this.translateTexts['attendance.day']
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

  initLineChat(name: string, title: string, target: Chart[], showTool: boolean = false, fn:any,unit:string,color: string[] = ['#3773F7', '#EEB174'], fontFamily: string[] = ['Helvetica', 'Tahoma', 'Arial', 'STXihei', '华文细黑', 'Microsoft YaHei', '微软雅黑', 'sans-serif']) {
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
          fontSize: 18
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: "{b}日 <br/>{a} : {c}天"
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
            title: this.translateTexts['attendance.back'],
            icon: 'image://assets/img/back.png',
            onclick() {
              fn.apply(that);
            }
          }
        }
      },
      series: [
        {
          name: title.substr(2),
          type: 'bar',
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
