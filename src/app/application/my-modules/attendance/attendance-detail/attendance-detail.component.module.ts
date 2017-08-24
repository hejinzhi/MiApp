import { NgModule } from '@angular/core';
import { AttendanceDetailComponent } from './attendance-detail.component';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [AttendanceDetailComponent],
  imports: [IonicPageModule.forChild(AttendanceDetailComponent), PipesModule],
  entryComponents: [
    AttendanceDetailComponent
  ]
})
export class AttendanceDetailComponentModule { }
