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
    // map.addControl(new BMap.ScaleControl(opts));
    // map.addControl(new BMap.OverviewMapControl());
    // map.addControl(new BMap.MapTypeControl());
    // map.addControl(new BMap.GeolocationControl());
    map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
    map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
    var point = new BMap.Point(..._this.pos);  // 创建点坐标
    map.centerAndZoom(point, 20);                 // 初始化地图，设置中心点坐标和地图级别

  //   	var geolocation = new BMap.Geolocation();
	// geolocation.getCurrentPosition(function(r){
	// 	if(this.getStatus() == 0){
	// 		var mk = new BMap.Marker(r.point);
	// 		map.addOverlay(mk);
	// 		map.panTo(r.point);
	// 		alert('您的位置：'+r.point.lng+','+r.point.lat);
	// 	}
	// 	else {
	// 		alert('failed'+this.getStatus());
	// 	}        
	// },{enableHighAccuracy: true})

    // let translateCallback = function (data: any) {
    //   if (data.status === 0) {
    //     let marker = new BMap.Marker(data.points[0]);
    //     map.addOverlay(marker);
    //     let label = new BMap.Label("转换后的百度坐标（正确）", { offset: new BMap.Size(20, -10) });
    //     marker.setLabel(label); //添加百度label
    //     map.setCenter(data.points[0]);
    //   }
    // }

    // setTimeout(function () {
    //   var convertor = new BMap.Convertor();
    //   var pointArr = [];
    //   pointArr.push(point);
    //   convertor.translate(pointArr, 1, 5, translateCallback)
    // }, 1000);
  }
}
