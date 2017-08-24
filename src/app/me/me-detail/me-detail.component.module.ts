import { NgModule } from '@angular/core';
import { MeDetailComponent } from './me-detail.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MeDetailComponent],
  imports: [IonicPageModule.forChild(MeDetailComponent), TranslateModule.forChild()],
  entryComponents: [
    MeDetailComponent
  ]
})
export class MeDetailComponentModule { }
