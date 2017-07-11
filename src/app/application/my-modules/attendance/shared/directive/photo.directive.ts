import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';
import { AttendanceService } from '../service/attendance.service';

@Directive({ selector: '[getPhoto]' })
export class PhotoDirective implements AfterViewInit {

  @Input() user_id:string;
  constructor(
    private el: ElementRef,
    private attendanceService: AttendanceService
  ) {

  }

  async ngAfterViewInit() {
    let res = await this.attendanceService.getUserPhoto(this.user_id);
    if(res.content) {
      this.el.nativeElement.src = res.content;
    }
  }
}
