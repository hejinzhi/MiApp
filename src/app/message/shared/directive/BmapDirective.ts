import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
import { MyHttpService } from '../../../core/services/myHttp.service';

@Directive({ selector: '[myBMap]' })

export class MyBMapDirective implements AfterViewInit {
  @Input() pos: string;
  @Input() addCtrl: string;

  poss: any[];

  constructor(
    private el: ElementRef,
    private myHttp: MyHttpService
  ) {

  }
  ngAfterViewInit() {
    this.poss = (this.pos.split(","));
    window['initBaidu'] = this.initBaidu;
    window['myEl'] = this;
    if (document.querySelector('script[baiduM]')) {
      if (window['BMap']) {
        this.initBaidu();
      }
    } else {
      this.loadJScript();
      if (window['BMap']) {
        this.initBaidu();
      } else {
        var flag = setInterval(() => {
          if (window['BMap']) {
            clearInterval(flag);
            this.initBaidu();
          }
        }, 100)
      }
    }
  }
  loadJScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.setAttribute('baiduM', '1')
    script.src = "https://api.map.baidu.com/api?v=2.0&ak=rECGU9AZLOa1SkguIO1UvN08de7kECrL&callback=initBaidu";
    document.body.appendChild(script);
  }
  initBaidu() {
    let _this = window['myEl'];
    let BMap = window['BMap'];
    let opts = { offset: new BMap.Size(100, 20) }
    var map = new BMap.Map(_this.el.nativeElement);         // 创建地图实例

    if (_this.addCtrl === 'Y') {
      map.addControl(new BMap.NavigationControl());
      map.addControl(new BMap.ScaleControl(opts));
      map.addControl(new BMap.OverviewMapControl());
      map.addControl(new BMap.MapTypeControl());
      map.addControl(new BMap.GeolocationControl());
      map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
      map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
    } else {
      //  map.enableScrollWheelZoom(true);
      map.disableDragging();
    }

    var point = new BMap.Point(..._this.poss);  // 创建点坐标
    map.centerAndZoom(point, 17);                 // 初始化地图，设置中心点坐标和地图级别


    let translateCallback = function (data: any) {
      if (data.status === 0) {
        let marker = new BMap.Marker(data.points[0]);
        var gc = new BMap.Geocoder();
        gc.getLocation(data.points[0], function (rs: any) {
          var addComp = rs.addressComponents;
          // console.log(addComp, 555);
          // console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
        });
        map.addOverlay(marker);
        // let label = new BMap.Label("转换后的百度坐标（正确）", { offset: new BMap.Size(20, -10) });
        // marker.setLabel(label); //添加百度label
        map.setCenter(data.points[0]);
      }
    }

    setTimeout(function () {
      var convertor = new BMap.Convertor();
      var pointArr = [];
      pointArr.push(point);
      convertor.translate(pointArr, 1, 5, translateCallback)
    }, 100);
  }
}
