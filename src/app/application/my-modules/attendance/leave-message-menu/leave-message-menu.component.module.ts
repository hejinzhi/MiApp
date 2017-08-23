import { NgModule } from '@angular/core';
import { LeaveMessageMenuComponent } from './leave-message-menu.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LeaveMessageMenuComponent],
  imports: [IonicPageModule.forChild(LeaveMessageMenuComponent), TranslateModule.forChild()],
  entryComponents: [
    LeaveMessageMenuComponent
  ]
})
export class LeaveMessageMenuComponentModule { }
