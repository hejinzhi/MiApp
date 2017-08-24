import { NgModule } from '@angular/core';
import { LeaveFormComponent } from './leave-form.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [LeaveFormComponent],
  imports: [IonicPageModule.forChild(LeaveFormComponent), PipesModule, TranslateModule.forChild()],
  entryComponents: [
    LeaveFormComponent
  ]
})
export class LeaveFormComponentModule { }
