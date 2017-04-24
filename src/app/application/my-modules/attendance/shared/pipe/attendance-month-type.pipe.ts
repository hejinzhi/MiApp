import { Pipe, PipeTransform } from '@angular/core';

import { HolidayType } from '../config/holiday-type';

@Pipe({name: 'sgAttendanceMonthType'})
export class AttendanceMonthType implements PipeTransform {
  swipeType = new HolidayType();
  transform(value: string): string {
    return this.swipeType.attendanceMonthType.filter((item) =>{
      return item.type === value;
    })[0].name;
  }
}
