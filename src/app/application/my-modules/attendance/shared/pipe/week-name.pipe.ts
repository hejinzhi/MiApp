import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sgWeekName' })
export class WeekNamePipe implements PipeTransform {
  transform(value: string): string {
    let week = new Date(value).getDay();
    let res: string = '出现编译错误';
    switch (week) {
      case 0:
        res = '星期日'
        break;
      case 1:
        res = '星期一'
        break;
      case 2:
        res = '星期二'
        break;
      case 3:
        res = '星期三'
        break;
      case 4:
        res = '星期四'
        break;
      case 5:
        res = '星期五'
        break;
      case 6:
        res = '星期六'
        break;
      default:
        break;

    }

    return res
  }
}
