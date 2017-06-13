import { NgModule } from '@angular/core';
import { LeaveMessageMenuComponent } from './leave-message-menu.component';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [LeaveMessageMenuComponent],
  imports: [IonicPageModule.forChild(LeaveMessageMenuComponent), PipesModule],
  entryComponents: [
    LeaveMessageMenuComponent
  ]
})
export class LeaveMessageMenuComponentModule { }
