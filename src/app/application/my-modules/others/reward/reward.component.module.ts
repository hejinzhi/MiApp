import { NgModule } from '@angular/core';
import { RewardComponent } from './reward.component';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from './components.module';

@NgModule({
  declarations: [RewardComponent],
  imports: [IonicPageModule.forChild(RewardComponent)],
  entryComponents: [
    RewardComponent
  ]
})
export class RewardComponentModule { }
