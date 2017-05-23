import { Pipe, PipeTransform } from '@angular/core';

import { HolidayType } from '../config/holiday-type';

@Pipe({name: 'sgOtherType'})
export class OtherTypePipe implements PipeTransform {
  swipeType = new HolidayType();
  transform(value: string,target:string): string {
    return this.swipeType[target].filter((item:{name:string,type:string}) =>{
      return item.type === value;
    })[0].name;
  }
}
