import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sgNum' })
export class MyNumber implements PipeTransform {
  // n 要保留的小数位
  transform(value: string, n:number=0): string {
    if(!value || isNaN(+value)) return value || '';
    n = n > 0 && n <= 20 ? n : 0;
    let val = value;
    val = parseFloat((val + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    let split = val.split(".");
    var l = split[0].split("").reverse();
    let r = split[1]? '.'+split[1]:'';
    let t = "";
    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + r;
  }
}
