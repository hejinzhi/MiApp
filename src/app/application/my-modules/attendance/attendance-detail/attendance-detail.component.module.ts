import { NgModule } from '@angular/core';
import { AttendanceDetailComponent } from './attendance-detail.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [AttendanceDetailComponent],
  imports: [IonicPageModule.forChild(AttendanceDetailComponent), PipesModule, TranslateModule.forChild()],
  entryComponents: [
    AttendanceDetailComponent
  ]
})
export class AttendanceDetailComponentModule { }
