import { Injectable } from '@angular/core';
import { MyHttpService } from '../../../../../core/services/myHttp.service';
import * as echarts from 'echarts';

@Injectable()
export class ChartService {

  fontFamily:string[] = ['Helvetica', 'Tahoma', 'Arial', 'STXihei', '华文细黑', 'Microsoft YaHei', '微软雅黑', 'sans-serif'];

  constructor(private myHttp: MyHttpService) {  }

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
        top: '7%',
        textStyle: {
          fontFamily: fontFamily,
          fontSize: 13
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
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      height: '60%',
      containLabel: true
    },
    legend: {
        orient: 'horizontal',
        top: '7%',
        itemGap: 4,
        textStyle: {
          fontFamily: fontFamily,
          fontSize: 13
        },
        data: data.legend_data
    },
    series : mySeries
   });
    return myChart;
  }

  initDoubleYChart(name: string, title: string,
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
  data2:any,color: string[] = ['#3773F7', '#EEB174'], fontFamily: string[] = this.fontFamily) {
    let myChart = echarts.init(document.getElementById(name));
    // 绘制图表
    let mySeries:any = data.series;
    mySeries[0].barGap = 0;
    mySeries[0].center = ['50%','70%'];
    myChart.setOption({
      title: {
        text: title, textStyle: {
          fontFamily: fontFamily,
          fontSize: '17'
        },
        x:'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: data.legend_data,
        top: '7%',
        itemGap: 2,
        textStyle: {
          fontFamily: fontFamily,
          fontSize: 12
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        height: '60%',
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
            type: 'value',
            scale: true,
            name: '',
            min: 0,
            boundaryGap: [0.2, 0.2],
            nameTextStyle: {
              fontFamily: fontFamily,
              fontSize: 14
            }
        },
        {
            type: 'value',
            scale: true,
            name: '',
            nameTextStyle: {
              fontFamily: fontFamily,
              fontSize: 14
            },
            min: 0,
            boundaryGap: [0.2, 0.2],

           splitLine: {
           	show: false
           },
           axisLabel : {
               formatter: '{value} %'
           }
        }
      ],
      series: mySeries.concat(data2),
      textStyle: {
        fontFamily: fontFamily,
        fontSize: 18
      }
    });
    return myChart;
  }

}
