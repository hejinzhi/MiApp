import { NgModule } from '@angular/core';
import { LeaveSubComponent } from './leave-sub.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LeaveSubComponent],
  imports: [IonicPageModule.forChild(LeaveSubComponent), TranslateModule.forChild()],
  entryComponents: [
    LeaveSubComponent
  ]
})
export class LeaveSubComponentModule { }
