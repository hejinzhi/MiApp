import { NgModule } from '@angular/core';
import { LeaveMessageMenuComponent } from './leave-message-menu.component';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [LeaveMessageMenuComponent],
  imports: [IonicPageModule.forChild(LeaveMessageMenuComponent)],
  entryComponents: [
    LeaveMessageMenuComponent
  ]
})
export class LeaveMessageMenuComponentModule { }
