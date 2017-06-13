import { NgModule } from '@angular/core';
import { LeaveSubComponent } from './leave-sub.component';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [LeaveSubComponent],
  imports: [IonicPageModule.forChild(LeaveSubComponent), PipesModule],
  entryComponents: [
    LeaveSubComponent
  ]
})
export class LeaveSubComponentModule { }
