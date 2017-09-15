import { NgModule } from '@angular/core';
import { LeaveMessageMenuComponent } from './leave-message-menu.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { BackButtonComponentModule } from '../../../.../../../shared/components/back-button/back-button.component.module';

@NgModule({
  declarations: [LeaveMessageMenuComponent],
  imports: [IonicPageModule.forChild(LeaveMessageMenuComponent), TranslateModule.forChild(), BackButtonComponentModule],
  entryComponents: [
    LeaveMessageMenuComponent
  ]
})
export class LeaveMessageMenuComponentModule { }
