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
import { FormMenuComponent } from './form-menu/form-menu.component';
import { LeaveSubComponent } from './leave-sub/leave-sub.component';
import { LeaveMessageMenuComponent } from './leave-message-menu/leave-message-menu.component';


@NgModule({
  imports:      [ CommonModule, IonicModule ],
  declarations: [
    AttendanceComponent,
    LeaveFormComponent,
    FormMenuComponent,
    OverTimeFormComponent,
    CallbackLeaveFormComponent,
    BusinessFormComponent,
    FormListComponent,
    UndoneFormComponent,
    SearcheComponent,
    SearchFormComponent,
    HoildayDetailComponent,
    LeaveSubComponent,
    LeaveMessageMenuComponent
  ],
  entryComponents:[
    AttendanceComponent,
    LeaveFormComponent,
    FormMenuComponent,
    OverTimeFormComponent,
    CallbackLeaveFormComponent,
    BusinessFormComponent,
    FormListComponent,
    UndoneFormComponent,
    SearcheComponent,
    SearchFormComponent,
    HoildayDetailComponent,
    LeaveSubComponent,
    LeaveMessageMenuComponent
  ],
  providers:    [ ]
})
export class AttendanceModule {}
