import { NgModule } from '@angular/core';
import { DutyDailyComponent } from './dutydaily.component';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from './components.module';

@NgModule({
  declarations: [DutyDailyComponent],
  imports: [IonicPageModule.forChild(DutyDailyComponent)],
  entryComponents: [
    DutyDailyComponent
  ]
})
export class DutyDailyComponentModule { }
