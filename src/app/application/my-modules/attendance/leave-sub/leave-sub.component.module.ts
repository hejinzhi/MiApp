import { NgModule } from '@angular/core';
import { LeaveSubComponent } from './leave-sub.component';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [LeaveSubComponent],
  imports: [IonicPageModule.forChild(LeaveSubComponent)],
  entryComponents: [
    LeaveSubComponent
  ]
})
export class LeaveSubComponentModule { }
