import { NgModule } from '@angular/core';
import { StatisticsComponent } from './statistics.component';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [IonicPageModule.forChild(StatisticsComponent)],
  entryComponents: [
    StatisticsComponent
  ]
})
export class StatisticsComponentModule { }
