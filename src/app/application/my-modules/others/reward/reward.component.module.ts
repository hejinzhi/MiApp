import { NgModule } from '@angular/core';
import { RewardComponent } from './reward.component';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from './components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../../../shared/pipe/pipes.module';

@NgModule({
  declarations: [RewardComponent],
  imports: [IonicPageModule.forChild(RewardComponent), TranslateModule.forChild(),PipesModule],
  entryComponents: [
    RewardComponent
  ]
})
export class RewardComponentModule { }
