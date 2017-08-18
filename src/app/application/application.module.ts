import { InspectionModule } from './my-modules/inspection/inspection.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../shared/shared.module';
import { ApplicationComponent } from './application.component';
import { MoreApplicationComponent } from './more-application/more-application.component';
import { ApplicationService } from './shared/service/application.service';

import { BookLibraryModule } from './my-modules/book-library/book-library.module';
import { AttendanceModule } from './my-modules/attendance/attendance.module';
import { ChartModule } from './my-modules/chart/chart.module';
import { ApplicationGridComponent } from './application-grid/application-grid.component';
import { PipesModule } from '../shared/pipe/pipes.module';
import { RewardModule } from './my-modules/others/reward/reward.module';
import { DutyDailyModule } from './my-modules/others/dutydaily/dutydaily.module';



@NgModule({

  imports: [CommonModule, IonicModule, SharedModule, BookLibraryModule, AttendanceModule, PipesModule, ChartModule, TranslateModule.forChild(), InspectionModule, RewardModule, DutyDailyModule],
  declarations: [ApplicationComponent, MoreApplicationComponent, ApplicationGridComponent],
  exports: [ApplicationComponent, MoreApplicationComponent, ApplicationGridComponent],
  entryComponents: [ApplicationComponent, MoreApplicationComponent, ApplicationGridComponent],
  providers: [ApplicationService]
})
export class ApplicationModule { }
