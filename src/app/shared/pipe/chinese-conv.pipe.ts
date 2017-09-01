import { Pipe, PipeTransform } from '@angular/core';
import { tify, sify } from 'chinese-conv';
import { TranslateService } from '@ngx-translate/core';

@Pipe({ name: 'sgChineseConv' })
export class ChineseConv implements PipeTransform {
  constructor(private translate: TranslateService){}
  transform(value: string): string {
    if (value) {
      let currentLang = this.translate.currentLang;
      if(!currentLang) return value;
      let chinese = ['ZH-CN','ZH-TW'];
      let idx = chinese.indexOf(currentLang.toUpperCase());
      switch (idx) {
        case 0:
          // return sify(JSON.stringify(value)).replace(/^\"/g, '').replace(/\"$/g, '');
          return sify(value);
        case 1:
          // return tify(JSON.stringify(value)).replace(/^\"/g, '').replace(/\"$/g, '');
          return tify(value);
        default:
          return value;
      }
    }
  }
}


{

}
