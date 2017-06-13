import { NgModule } from '@angular/core';
import { HoildayDetailComponent } from './holiday-detail.component';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [HoildayDetailComponent],
  imports: [IonicPageModule.forChild(HoildayDetailComponent), PipesModule],
  entryComponents: [
    HoildayDetailComponent
  ]
})
export class HoildayDetailComponentModule { }
