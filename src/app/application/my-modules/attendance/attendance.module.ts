import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { AttendanceService } from './shared/service/attendance.service';

@NgModule({
  imports:      [ CommonModule, IonicModule ],
  providers:    [ AttendanceService ]
})
export class AttendanceModule {}
