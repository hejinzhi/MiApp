import { NgModule } from '@angular/core';
import { AttendanceComponent } from './attendance.component';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from './components.module';

@NgModule({
  declarations: [AttendanceComponent],
  imports: [IonicPageModule.forChild(AttendanceComponent)],
  entryComponents: [
    AttendanceComponent
  ]
})
export class AttendanceComponentModule { }
