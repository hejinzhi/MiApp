import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({ selector: '[myBMap]' })

export class MyBMapDirective implements AfterViewInit {
  @Input() pos: number[];

  constructor(
    private el: ElementRef,
  ) {

  }
  ngAfterViewInit() {
    window['initBaidu'] = this.initBaidu;
    window['myEl'] = this;
    if (document.querySelector('script[baiduM]')) {
      this.initBaidu();
    } else {
      this.loadJScript();
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
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl(opts));
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());
    map.addControl(new BMap.GeolocationControl());
    map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
    map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
    map.disableDoubleClickZoom()
    var point = new BMap.Point(..._this.pos);  // 创建点坐标
    map.centerAndZoom(point, 20);                 // 初始化地图，设置中心点坐标和地图级别
    //      var geolocation = new BMap.Geolocation();  //实例化浏览器定位对象。
    //      console.log(geolocation)
    //  //下面是getCurrentPosition方法。调用该对象的getCurrentPosition()，与HTML5不同的是，这个方法原型是getCurrentPosition(callback:function[, options: PositionOptions])，也就是说无论成功与否都执行回调函数1，第二个参数是关于位置的选项。 因此能否定位成功需要在回调函数1中自己判断。
    // geolocation.getCurrentPosition(function(r){   //定位结果对象会传递给r变量
    //     // if(this.getStatus() == 'BMAP_STATUS_SUCCESS'){  //通过Geolocation类的getStatus()可以判断是否成功定位。
    //     //     var mk = new BMap.Marker(r.point);    //基于定位的这个点的点位创建marker
    //     //     map.addOverlay(mk);    //将marker作为覆盖物添加到map地图上
    //     //     map.panTo(r.point);   //将地图中心点移动到定位的这个点位置。注意是r.point而不是r对象。
    //     //     alert('您的位置：'+r.point.lng+','+r.point.lat);  //r对象的point属性也是一个对象，这个对象的lng属性表示经度，lat属性表示纬度。
    //     // }
    //     // else {
    //     //     alert('failed'+this.getStatus());
    //     // }
    //     console.log(r)
    // },{enableHighAccuracy: true})
      }
  }
