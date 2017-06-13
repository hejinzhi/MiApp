import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { LeaveFormComponent } from './leave-form/leave-form.component';
import { OverTimeFormComponent } from './over-time-form/over-time-form.component';
import { HoildayDetailComponent } from './hoilday-detail/holiday-detail.component';
import { CallbackLeaveFormComponent } from './callback-leave-form/callback-leave-form.component';
import { BusinessFormComponent } from './business-form/business-form.component';
import { FormListComponent } from './form-list/form-list.component';
import { UndoneFormComponent } from './undone-form/undone-form.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { FormMenuComponent } from './form-menu/form-menu.component';
import { ListFilterComponent } from './list-filter/list-filter.component';
import { DetailBetweenFormComponent } from './detail-between-form/detail-between-form.component';
import { SwipeNoteComponent } from './swipe-note/swipe-note.component';
import { AttendanceDetailComponent } from './attendance-detail/attendance-detail.component';
import { DetailOnFormComponent } from './detail-on-form/detail-on-form.component';
import { AttendanceMonthComponent } from './attendance-month/attendance-month.component';
import { SignListComponent } from './sign-list/sign-list.component';
import { LeaveMessageMenuComponent } from './leave-message-menu/leave-message-menu.component';
import { LeaveSubComponent } from './leave-sub/leave-sub.component';
import { StatisticsComponent } from './statistics/statistics.component';


import { PipesModule } from './shared/pipe/pipes.module';

import { AttendanceService } from './shared/service/attendance.service';

@NgModule({
  imports:      [ IonicModule, PipesModule ],
  declarations: [
    LeaveFormComponent,
    FormMenuComponent,
    OverTimeFormComponent,
    CallbackLeaveFormComponent,
    BusinessFormComponent,
    FormListComponent,
    UndoneFormComponent,
    SearchFormComponent,
    HoildayDetailComponent,
    ListFilterComponent,
    DetailBetweenFormComponent,
    SwipeNoteComponent,
    AttendanceDetailComponent,
    DetailOnFormComponent,
    AttendanceMonthComponent,
    SignListComponent,
    LeaveMessageMenuComponent,
    LeaveSubComponent,
    StatisticsComponent
  ],
  entryComponents:[
    LeaveFormComponent,
    FormMenuComponent,
    OverTimeFormComponent,
    CallbackLeaveFormComponent,
    BusinessFormComponent,
    FormListComponent,
    UndoneFormComponent,
    SearchFormComponent,
    DetailBetweenFormComponent,
    HoildayDetailComponent,
    SwipeNoteComponent,
    AttendanceDetailComponent,
    DetailOnFormComponent,
    AttendanceMonthComponent,
    SignListComponent,
    LeaveMessageMenuComponent,
    LeaveSubComponent,
    StatisticsComponent
  ],
  providers:    [ AttendanceService ]
})
export class ComponentsModule {}
