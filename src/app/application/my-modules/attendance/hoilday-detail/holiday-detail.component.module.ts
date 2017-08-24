import { NgModule } from '@angular/core';
import { HoildayDetailComponent } from './holiday-detail.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [HoildayDetailComponent],
  imports: [IonicPageModule.forChild(HoildayDetailComponent), PipesModule, TranslateModule.forChild()],
  entryComponents: [
    HoildayDetailComponent
  ]
})
export class HoildayDetailComponentModule { }
