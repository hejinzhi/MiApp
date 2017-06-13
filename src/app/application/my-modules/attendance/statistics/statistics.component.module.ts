import { NgModule } from '@angular/core';
import { StatisticsComponent } from './statistics.component';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [IonicPageModule.forChild(StatisticsComponent), PipesModule],
  entryComponents: [
    StatisticsComponent
  ]
})
export class StatisticsComponentModule { }
