import { NgModule } from '@angular/core';
import { AttendanceMonthComponent } from './attendance-month.component';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [AttendanceMonthComponent],
  imports: [IonicPageModule.forChild(AttendanceMonthComponent), PipesModule],
  entryComponents: [
    AttendanceMonthComponent
  ]
})
export class AttendanceMonthComponentModule { }
