import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sgTimeDesc' })
export class TimeDescPipe implements PipeTransform {

  transform(value: number): string {
    let Y, M, D, W, H, I, S;
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var d = new Date(Math.floor(value / 1000) * 1000);
    var Week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    Y = d.getFullYear();
    M = this.fillZero(d.getMonth() + 1);
    D = this.fillZero(d.getDate());
    W = Week[d.getDay()];
    H = this.fillZero(d.getHours());
    I = this.fillZero(d.getMinutes());
    S = this.fillZero(d.getSeconds());

    if (new Date(value).toDateString() === new Date().toDateString()) {
      //今天
      if (H <= 12) {
        H = '上午' + H;
      } else if (H > 12 && H < 24) {
        H -= 12;
        H = '下午' + this.fillZero(H);
      } else if (H == 24) {
        H = '00';
      }
      var localTime = H + ':' + I;
    } else if (new Date(value + day).toDateString() === new Date().toDateString()) {
      //昨天
      if (H <= 12) {
        H = '昨天上午' + H;
      } else if (H > 12 && H < 24) {
        H -= 12;
        H = '昨天下午' + this.fillZero(H);
      } else if (H == 24) {
        H = '00';
      }
      var localTime = H + ':' + I;
    }
    else if (new Date(value) < new Date()) {
      var localTime = Y + '-' + M + '-' + D;
    }
    return localTime;
  }
  fillZero(v: any) {
    if (v < 10) { v = '0' + v; }
    return v;
  }
}
