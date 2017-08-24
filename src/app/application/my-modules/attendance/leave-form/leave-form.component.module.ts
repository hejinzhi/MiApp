import { NgModule } from '@angular/core';
import { LeaveFormComponent } from './leave-form.component';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [LeaveFormComponent],
  imports: [IonicPageModule.forChild(LeaveFormComponent), PipesModule],
  entryComponents: [
    LeaveFormComponent
  ]
})
export class LeaveFormComponentModule { }
