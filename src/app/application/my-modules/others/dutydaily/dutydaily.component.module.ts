import { NgModule } from '@angular/core';
import { DutyDailyComponent } from './dutydaily.component';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from './components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../../../shared/pipe/pipes.module';

@NgModule({
  declarations: [DutyDailyComponent],
  imports: [IonicPageModule.forChild(DutyDailyComponent), TranslateModule.forChild(), PipesModule],
  entryComponents: [
    DutyDailyComponent
  ]
})
export class DutyDailyComponentModule { }
