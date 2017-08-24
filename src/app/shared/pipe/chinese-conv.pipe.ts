import { Pipe, PipeTransform } from '@angular/core';
import { tify, sify } from 'chinese-conv';

@Pipe({ name: 'sgChineseConv' })
export class ChineseConv implements PipeTransform {
  transform(value: string): string {
    if (value) {
      let fontType: string = localStorage.getItem('languageType');
      switch (fontType) {
        case 'simple_Chinese':
          // return sify(JSON.stringify(value)).replace(/^\"/g, '').replace(/\"$/g, '');
          return sify(value);
        case 'traditional_Chinese':
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
