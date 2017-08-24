import { NgModule } from '@angular/core';
import { StatisticsComponent } from './statistics.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [IonicPageModule.forChild(StatisticsComponent), TranslateModule.forChild()],
  entryComponents: [
    StatisticsComponent
  ]
})
export class StatisticsComponentModule { }
