import { NgModule } from '@angular/core';
import { BossScheduleListComponent } from './boss-schedule-list.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [BossScheduleListComponent],
  imports: [IonicPageModule.forChild(BossScheduleListComponent),  TranslateModule.forChild()],
  entryComponents: [
    BossScheduleListComponent
  ]
})
export class InspMenuComponentModule { }
