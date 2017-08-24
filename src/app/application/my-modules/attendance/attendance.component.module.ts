import { NgModule } from '@angular/core';
import { AttendanceComponent } from './attendance.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from './components.module';

@NgModule({
  declarations: [AttendanceComponent],
  imports: [IonicPageModule.forChild(AttendanceComponent), TranslateModule.forChild()],
  entryComponents: [
    AttendanceComponent
  ]
})
export class AttendanceComponentModule { }
