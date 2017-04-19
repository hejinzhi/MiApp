import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { AttendanceComponent } from './attendance.component';
import { LeaveFormComponent } from './leave-form/leave-form.component';
import { OverTimeFormComponent } from './over-time-form/over-time-form.component';
import { HoildayDetailComponent } from './hoilday-detail/holiday-detail.component';
import { CallbackLeaveFormComponent } from './callback-leave-form/callback-leave-form.component';
import { BusinessFormComponent } from './business-form/business-form.component';
import { FormListComponent } from './form-list/form-list.component';
import { UndoneFormComponent } from './undone-form/undone-form.component';
import { SearcheComponent } from './search/search.component';
import { SearchFormComponent } from './search-form/search-form.component';

@NgModule({
  imports:      [ CommonModule, IonicModule ],
  declarations: [
    AttendanceComponent,
    LeaveFormComponent,
    OverTimeFormComponent,
    CallbackLeaveFormComponent,
    BusinessFormComponent,
    FormListComponent,
    UndoneFormComponent,
    SearcheComponent,
    SearchFormComponent,
    HoildayDetailComponent
  ],
  entryComponents:[
    AttendanceComponent,
    LeaveFormComponent,
    OverTimeFormComponent,
    CallbackLeaveFormComponent,
    BusinessFormComponent,
    FormListComponent,
    UndoneFormComponent,
    SearcheComponent,
    SearchFormComponent,
    HoildayDetailComponent
  ],
  providers:    [ ]
})
export class AttendanceModule {}
