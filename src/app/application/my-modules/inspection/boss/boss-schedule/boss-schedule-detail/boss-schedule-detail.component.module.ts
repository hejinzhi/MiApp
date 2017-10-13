import { SearchColleagueComponentModule } from './../../../../../../shared/components/search-colleague/search-colleague.component.module';
import { NgModule } from '@angular/core';
import { BossScheduleDetailComponent } from './boss-schedule-detail.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [BossScheduleDetailComponent],
  imports: [IonicPageModule.forChild(BossScheduleDetailComponent),  TranslateModule.forChild(),SearchColleagueComponentModule],
  entryComponents: [
    BossScheduleDetailComponent
  ]
})
export class InspMenuComponentModule { }
