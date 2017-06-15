import { NgModule } from '@angular/core';
import { MeDetailComponent } from './me-detail.component';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [MeDetailComponent],
  imports: [IonicPageModule.forChild(MeDetailComponent)],
  entryComponents: [
    MeDetailComponent
  ]
})
export class MeDetailComponentModule { }
