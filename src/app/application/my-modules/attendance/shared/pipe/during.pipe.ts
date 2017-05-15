import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sgDuring' })
export class DuringPipe implements PipeTransform {
  transform(value: string): string {
    if(value === null) return value;
    let res = '';
    let during = Date.parse(new Date().toString()) - Date.parse(value);
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
