import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { PluginService }   from '../../../../core/services/plugin.service';
import { ChartService } from '../shared/service/chart.service';

@IonicPage()
@Component({
  selector: 'sg-starage-age-analysis',
  templateUrl: 'starage-age-analysis.component.html'
})
export class StarageAgeAnalysisComponent {

  isHere: boolean;
  pageY: number;
  pageX: number;
  @ViewChild('main1') myContent: any;
  fontFamily: string[] = ['Helvetica', 'Tahoma', 'Arial', 'STXihei', '华文细黑', 'Microsoft YaHei', '微软雅黑', 'sans-serif'];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private plugin: PluginService,
    private chartService: ChartService
  ) { }

  ionViewDidLoad() {
    this.addWidth();
    let option1: any = this.chartService.initDoubleYChart('IDL年资分析', {
      legend_data: ['0-30 days AMT', '30-60 days AMT', '61-90 days AMT', '91-120 days AMT', '>120 days AMT', '0-30RATE', '31-60RATE', '61-90RATE', '91-120RATE', '>120RATE'],
      xAxis_data: ['201701', '201702', '201703', '201704', '201705'],
      series: [{
        name: '0-30 days AMT',
        type: 'bar',
        data: [{ value: 298057650 }, { value: 326359815 }, { value: 287728183 }, { value: 234650359 },
          { value: 221514561 }]
      }, {
          name: '30-60 days AMT',
          type: 'bar',
          data: [{ value: 99136086 }, { value: 122085446 }, { value: 130271557 }, { value: 93448435 },
            { value: 70752847 }]
        }, {
          name: '61-90 days AMT',
          type: 'bar',
          data: [{ value: 40649754 }, { value: 48184630 }, { value: 53114304 }, { value: 86811628 },
            { value: 53017785 }]
        }, {
          name: '91-120 days AMT',
          type: 'bar',
          data: [{ value: 28285935 }, { value: 28984522 }, { value: 26992622 }, { value: 37286349 },
            { value: 69500338 }]
        },
        {
          name: '>120 days AMT',
          type: 'bar',
          data: [{ value: 112621906 }, { value: 112109870 }, { value: 118892134 }, { value: 128725030 },
            { value: 137531714 }]
        }
      ]
    }, [{
      name: '0-30RATE',
      type: 'line',
      data: [{ value: 51.5 }, { value: 51.18 }, { value: 46.63 }, { value: 40.39 },
        { value: 40.15 }]
    }, {
          name: '31-60RATE',
          type: 'line',
          data: [{ value: 17.13 }, { value: 19.14 }, { value: 21.11 }, { value: 16.09 },
            { value: 12.72 }]
        }, {
          name: '61-90RATE',
          type: 'line',
          data: [{ value: 7.02 }, { value: 7.56 }, { value: 8.61 }, { value: 14.94 },
            { value: 9.61 }]
        }, {
          name: '91-120RATE',
          type: 'line',
          data: [{ value: 4.89 }, { value: 4.54 }, { value: 4.37 }, { value: 6.42 },
            { value: 12.6 }]
        }, {
          name: '>120RATE',
          type: 'line',
          data: [{ value: 19.46 }, { value: 17.58 }, { value: 19.27 }, { value: 22.16 },
            { value: 24.93 }]
        }
      ]);
    option1.series[0].center = ['50%', '70%'];
    option1.grid.height = '60%';
    option1.yAxis[1].axisLabel = {
      formatter: '{value} %'
    }
    option1.legend.top = 'auto';
    option1.legend.bottom = 0;
    option1.grid.bottom = 'auto';
    option1.grid.top = '13%';

    option1.color = ['#91c7ae', '#2f4554', '#61a0a8', '#d48265', '#c23531', '#91c7ae', '#2f4554', '#61a0a8', '#d48265', '#c23531']
    let optionQuery1: { baseOption: any, media: any } = {
      baseOption:option1,
      media:[
        {
          query:{
            maxWidth: 480,
          },
          option:{
            dataZoom:[{
              type: 'inside',
              disabled:true,
            }]
          }
        },
        {
          query:{
            maxWidth: 420,
          },
          option:{
            dataZoom:[{
              type: 'inside',
              disabled:false,
              xAxisIndex: [0],
              start:1,
              end:35
            }]
          }
        }
      ]
    }
    this.chartService.makeChart('main1', optionQuery1)
    let option2 = this.chartService.initSingleYChart('201705 MSL庫存帳齡', {
      legend_data: [],
      xAxis_data: ['0-30 days AMT', '30-60 days AMT', '61-90 days AMT', '91-120 days AMT', '>120 days AMT'],
      series: [{
        name: '库存量',
        type: 'bar',
        data: [{ value: 137531714 }, { value: 69500338 }, { value: 53017785 }, { value: 70152847 },
          { value: 221514561 }]
      }]
    }, false);
    option2.grid.top = '9%';
    option2.grid.bottom = '15%';
    option2.xAxis[0].axisLabel = {
      rotate: 45
    }
    option2.tooltip.formatter = "{b} <br/>{a} : {c}",
      option2.series[0].data.map((item: any, index: number) => {
        return item.itemStyle = {
          normal: {
            color: option1.color[index]
          }
        }
      })
    this.chartService.makeChart('main2', option2);

    let option3: any = this.chartService.initPieChart('201705 MSL庫存帳齡', {
      legend_data: ['0-30RATE', '31-60RATE', '61-90RATE', '91-120RATE', '>120RATE'],
      series: [{
        name: '库存比例', data: [{ value: 137531714, name: '0-30RATE' }, { value: 69500338, name: '31-60RATE' },
          { value: 53017785, name: '61-90RATE' }, { value: 70152847, name: '91-120RATE' }, { value: 221514561, name: '>120RATE' }]
      }]
    })
    option3.color = ['#91c7ae', '#2f4554', '#61a0a8', '#d48265', '#c23531'];
    // option3.series[0].radius = ['0','70%']
    let optionQuery3: { baseOption: any, media: any } = {
      baseOption: option3,
      media: [
        {
          query: {
            maxWidth: 400
          },
          option: {
            series: [{ radius: ['0', '70%'] }]
          }
        },
        {
          query: {
            maxWidth: 400
          },
          option: {
            series: [{ radius: ['0', '70%'] }]
          }
        },
        {
          query: {
            maxWidth: 321
          },
          option: {
            series: [{ radius: ['0', '55%'] }]
          }
        }
      ]
    }
    this.chartService.makeChart('main3', optionQuery3);

  }

  reFresh() {
    this.ionViewDidLoad();
  }
  ionViewWillEnter() {
    this.isHere = true;
    window.addEventListener('resize', () => this.resize());
  }
  resize() {
    if (!this.isHere) return;
    this.ionViewDidLoad();
  }
  ionViewWillLeave() {
    this.isHere = false;
  }

  draftStart(e: any) {
    this.pageY = e.touches[0].pageY;
  }
  draft(e: any) {
    let move = Math.max(e.touches[0].pageY - this.pageY, 0);
    this.myContent.nativeElement.style.marginTop = move + 'px';
  }
  draftEnd() {
    this.myContent.nativeElement.style.marginTop = '0px';
  }
  addWidth() {
    let content: any = document.querySelector('.storage .scroll-content');
    content.addEventListener('touchstart', (e: any) => {
      this.pageX = e.touches[0].pageX;
    });
    content.addEventListener('touchmove', (e: any) => {
      content.style.marginLeft = (e.touches[0].pageX - this.pageX) + 'px';
    });
    content.addEventListener('touchend', (e: any) => {
      content.style.marginLeft = 0 + 'px';
    })
  }
}
