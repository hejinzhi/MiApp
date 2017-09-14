import { NgModule } from '@angular/core';
import { LeaveSubComponent } from './leave-sub.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { BackButtonComponentModule } from '../../../.../../../shared/components/back-button/back-button.component.module';

@NgModule({
  declarations: [LeaveSubComponent],
  imports: [IonicPageModule.forChild(LeaveSubComponent), TranslateModule.forChild(), BackButtonComponentModule],
  entryComponents: [
    LeaveSubComponent
  ]
})
export class LeaveSubComponentModule { }
