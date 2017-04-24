import { Pipe, PipeTransform } from '@angular/core';

import { HolidayType } from '../config/holiday-type';

@Pipe({name: 'sgSwipeType'})
export class SwipeTypePipe implements PipeTransform {
  swipeType = new HolidayType();
  transform(value: string): string {
    return this.swipeType.swipeType.filter((item) =>{
      return item.type === value;
    })[0].name;
  }
}
