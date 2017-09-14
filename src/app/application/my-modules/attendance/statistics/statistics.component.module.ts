import { NgModule } from '@angular/core';
import { StatisticsComponent } from './statistics.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { BackButtonComponentModule } from '../../../.../../../shared/components/back-button/back-button.component.module';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [IonicPageModule.forChild(StatisticsComponent), TranslateModule.forChild(), BackButtonComponentModule],
  entryComponents: [
    StatisticsComponent
  ]
})
export class StatisticsComponentModule { }
