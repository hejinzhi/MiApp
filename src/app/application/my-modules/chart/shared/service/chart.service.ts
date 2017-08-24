import { Injectable } from '@angular/core';
import { MyHttpService } from '../../../../../core/services/myHttp.service';
import { PluginService }   from '../../../../../core/services/plugin.service';

import * as echarts from 'echarts';

import { ChartConfig } from '../config/chart.config';

@Injectable()
export class ChartService {

  fontFamily: string[] = ['Helvetica', 'Tahoma', 'Arial', 'STXihei', '华文细黑', 'Microsoft YaHei', '微软雅黑', 'sans-serif'];
  private myChart: any;
  offsetTop: number;//需要滚动的位置离窗口最上面的高度
  content: any;//滚动的容器
  f:any;// 注册在resize的方法

  constructor(private myHttp: MyHttpService,private plugin:PluginService) {
    this.autoResizeChart();
  }

  /**
   * 初始化滚动的到目标所需的数据
   * @param  {string} comp     组件的名称
   * @param  {string} selector dom的选择器
   */
  initScroll(comp:string,selector:string) {
    this.getOffsetTop(selector);
    if(!this.offsetTop) return;
    this.content = document.querySelector(comp + ' .scroll-content');
    this.observeOffsetTop(selector);
  }

  /**
   * 获得需要滚动的位置离窗口最上面的高度
   * @param  {string} selector dom的选择器
   */
  getOffsetTop(selector:string) {
    let el: any = document.querySelector(selector);
    if(!el) return;
    this.offsetTop = el.offsetTop;
  }

  /**
   * 执行滚动的目标位置
   */
  scroll_down() {
    setTimeout(() => {
      this.content.scrollTop = this.offsetTop;
    }, 200);
  }

  /**
   * 注册resize事情，获得最新的滚动的位置离窗口最上面的高度
   * @param  {string} selector dom的选择器
   */
  observeOffsetTop(selector:string) {
    window.addEventListener('resize', this.f = this.getOffsetTop.bind(this,selector));
  }

  /**
   * 取消在resize上注册的观察OffsetTop的事件
   */
  unObserveOffsetTop() {
    window.removeEventListener('resize', this.f);
  }

  /**
   * 将对象转换为数组
   * @param  {Object} obj 对象
   * @return {Array}     数组
   */
  changeObjectToArray(obj:Object):any[] {
    let arr = [];
    for(let item in obj){
        arr.push(obj[item]);
    }
    return arr;
  }

  /**
   * 定义在窗口大小改变时能调整大小的echarts
   */
  autoResizeChart() {
    let mychart = Object.assign({}, Object.create(echarts).__proto__);
    mychart.init = function() {
      let view = echarts.init.apply(this, arguments);
      window.addEventListener('resize', () => view.resize());
      return view;
    }
    mychart.init.prototype = Object.create(echarts.init.prototype);
    this.myChart = mychart;
  }

  /**
   * 获得在窗口大小改变时能调整大小的echarts
   * @return {mycharts} 自适应echarts
   */
  getAutoResizeChart() {
    return this.myChart;
  }

  /**
   * 返回echarts
   * @return {echarts} echarts
   */
  getECharts() {
    return echarts;
  }

  /**
   * 渲染图表
   * @param  {Element} dom    dom元素
   * @param  {any}     option echarts的配置
   * @return {echarts的init对象}         新图表对象
   */
  makeChartWithDom(dom: Element, option: any) {
    let myChart = this.myChart.init(dom);
    myChart.setOption(option);
    return myChart;
  }

  /**
   * 查找并设置元素，渲染图表
   * @param  {string}     id     dom的id
   * @param  {any}        option echarts的配置
   * @param  {boolean}    setHeight 是否再次设置高度（dom被div等包住时无法使用自适应高度），默认为false
   * @return {echarts的init对象}         新图表对象
   */
  makeChart(id: string, option: any, setHeight:boolean = false) {
    let dom = document.getElementById(id);
    if(!dom) {
      setTimeout(() => this.makeChart(id,option,setHeight),100)
      return;
    };
    if(setHeight) {
      dom.style.height = window.outerHeight * 0.47 + 'px';
    }
    let myChart = this.myChart.init(dom);
    myChart.setOption(option);
    return myChart;
  }

  /**
   * 将echarts的配置进行简繁体转换
   * @param  {string} option echarts的配置，经过了JSON.stringify的加工
   * @return {option}        echarts的配置
   */
  optionConv(option:string) {
    let temp = JSON.parse(option);
    return JSON.parse(this.plugin.chineseConv(temp));
  }
  /**
   * 获得年资分析的信息
   * @return {Promise<response>} http的结果
   */
  getSalaryChartInfo() {
    return this.myHttp.get(ChartConfig.getSalaryChartInfo);
  }

  /**
   * 获得离职率分析的信息
   * @param  {string} type 传入类别，T是总公司，DL是直接员工，IDL是间接员工，SA是绩效高的员工
   * @return {Promise<response>} http的结果
   */
  getDimissionChartInfo(type:string) {
    return this.myHttp.get(ChartConfig.getDimissionChartInfo.replace('{type}',type));
  }

  /**
   * 获得MPS達成率(日报)的信息
   * @return {Promise<response>} http的结果
   */
  getMpsDayChartInfo() {
    return this.myHttp.get(ChartConfig.getMpsDayChartInfo);
  }

  /**
   * 获得MPS達成率(月报)的信息
   * @param  {string} type [MSL, MD1, MD2, MD3]之一
   * @return {Promise<response>} http的结果
   */
  getMpsMonthChartInfo(type:string) {
    return this.myHttp.get(ChartConfig.getMpsMonthChartInfo.replace('{type}',type));
  }

  /**
   * 获得出货達成率(日报)的信息
   * @return {Promise<response>} http的结果
   */
  getSaleDayChartInfo() {
    return this.myHttp.get(ChartConfig.getSaleDayChartInfo);
  }

  /**
   * 获得MPS達成率(月报)的信息
   * @param  {string} type [TBU CBU EBU MBU MSL_CM MSL]之一
   * @return {Promise<response>} http的结果
   */
  getSaleMonthChartInfo(type:string) {
    return this.myHttp.get(ChartConfig.getSaleMonthChartInfo.replace('{type}',type));
  }

  /**
   * 获得PL庫周轉天數(日報)的信息
   * @param  {string} date   日期，格式为YYYYMMDD
   * @param  {number} deptID [82,81,101,121,141,161,162,1,181,102] 之一
   * @return {Promise<response>} http的结果
   */
  getPlFlowChartInfo(date:string,deptID:number) {
    if(date.length !== 8) throw new Error('date:'+date+'does not mark the requested date formatter,the right formatter should be YYYYMMDD');
    if([82,81,101,121,141,161,162,1,181,102].indexOf(deptID)<0) throw new Error('department:'+deptID+'is not exit');
    return this.myHttp.get(ChartConfig.getPlFlowChartInfo.replace('{dateStr}',date).replace('{deptID}',deptID+''))
  }













  afterInit(option: any) {
    option = this.addFontFamily(option);
    return option
  }

  addFontFamily(option: any, fontFamily: string[] = this.fontFamily) {
    let add = { fontFamily: fontFamily };
    Object.assign(option.textStyle, add);
    return option
  }
  initSingleYChart(title: string,
    data: {
      legend_data: string[],
      xAxis_data: string[],
      series: {
        name: string,
        type: string,
        data: {
          value: number
        }[],
      }[]
    }, isY_value: boolean = true) {
    let mySeries: any = data.series;
    mySeries[0].barGap = 0;
    let option: any = {
      title: {
        text: title, textStyle: {
          fontSize: 18
        },
        x: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: data.legend_data,
        top: '7%',
        textStyle: {
          fontSize: 13
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      series: mySeries,
      textStyle: {
        fontSize: 18
      }
    }
    if (isY_value) {
      option.yAxis = [{ type: 'value' }]
      option.xAxis = [
        {
          type: 'category',
          data: data.xAxis_data,
          axisTick: {
            alignWithLabel: true
          }
        }
      ]
    } else {
      option.xAxis = [{ type: 'value' }]
      option.yAxis = [
        {
          type: 'category',
          data: data.xAxis_data,
          axisTick: {
            alignWithLabel: true
          }
        }
      ]
    }
    option = this.afterInit(option);
    return option;
  }

  initPieChart(title: string,
    data: {
      legend_data: string[],
      series: {
        name: string,
        data: { value: number, name: string }[]
      }[]
    }) {
    let mySeries: any = data.series;
    mySeries[0].type = 'pie';
    mySeries[0].itemStyle = {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    };
    mySeries[0].center = ['50%', '60%'];
    let option = {
      title: {
        text: title,
        textStyle: {
          fontSize: 18
        },
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : <br/>{c} ({d}%)"
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
          fontSize: 13
        },
        data: data.legend_data
      },
      series: mySeries,
      textStyle: {

      }
    }
    option = this.afterInit(option);
    return option;
  }

  initDoubleYChart(title: string,
    data: {
      legend_data: string[],
      xAxis_data: string[],
      series: {
        name: string,
        type: string,
        data: {
          value: number
        }[],
      }[]
    },
    data2: {
      name: string,
      type: string,
      data: {
        value: number
      }[],
    }[]) {
    data2 = data2.map((res: any) => {
      res.yAxisIndex = 1;
      return res;
    })
    let mySeries: any = data.series;
    mySeries[0].barGap = 0;
    let option = {
      title: {
        text: title, textStyle: {
          fontSize: '17'
        },
        x: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: data.legend_data,
        top: '7%',
        itemGap: 2,
        textStyle: {
          fontSize: 12
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
          type: 'value',
          scale: true,
          name: '',
          min: 0,
          boundaryGap: [0.2, 0.2],
          nameTextStyle: {
            fontSize: 14
          }
        },
        {
          type: 'value',
          scale: true,
          name: '',
          nameTextStyle: {
            fontSize: 14
          },
          min: 0,
          boundaryGap: [0.2, 0.2],

          splitLine: {
           	show: false
          }
        }
      ],
      series: mySeries.concat(data2),
      textStyle: {
        fontSize: 18
      }
    }
    option = this.afterInit(option);
    return option;
  }

}
