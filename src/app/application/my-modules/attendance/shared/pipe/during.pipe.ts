import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sgDuring' })
export class DuringPipe implements PipeTransform {
  transform(value: string): string {
    if(value === null) return value;
    let during = 0;
    if(Date.parse(value.replace('T',' '))) {
      value = value.replace('T',' ')
      during = Date.parse(new Date().toString()) - Date.parse(value);
    } else {
      during = Date.parse(new Date().toString()) - Date.parse(value) + 8*60*60*1000;
    }
    let res = '';
    if(during<1000*60*60) {
      res = Math.ceil(during/(1000*60)) +'分钟'
    } else {
      let hour = Math.floor(during/(1000*60*60));
      let minute = Math.ceil((during - hour*1000*60*60)/(1000*60));
      res = hour +'小时'+minute +'分钟';
    }
    return res;
  }
}
