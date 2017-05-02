import { Pipe, PipeTransform } from '@angular/core';

import { HolidayType } from '../config/holiday-type';

import { AttendanceService } from '../service/attendance.service';

@Pipe({ name: 'sgReasonType' })
export class ReasonTypePipe implements PipeTransform {
  leaveType = new HolidayType();
  constructor(private attendanceService: AttendanceService) {}
  transform(value: string, type: string): string {
    let reasonType: string = value;
    switch (type) {
      case '0':
        reasonType = '门禁异常'
        break;
      case '1':
        reasonType = '未刷卡'
        break;
      case '2':
        if(localStorage.getItem('leaveType')) {
          reasonType = JSON.parse(localStorage.getItem('leaveType')).filter((item:{type:string,name:string}) => {
            return item.type === value;
          })[0].name;
        } else {
          reasonType = this.leaveType.type.filter((item) => {
            return item.type === value;
          })[0].name;
        }
        break;
      case '3':
        reasonType = this.leaveType.jobType.filter((item) => {
          return item.type === value;
        })[0].name;
        break;
      case '4':
        reasonType = this.leaveType.businessType.filter((item) => {
          return item.type === value;
        })[0].name;
        break;
      default:
        break
    }
    return reasonType
  }
}
