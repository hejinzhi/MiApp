import { NgModule } from '@angular/core';
import { MeComponent } from './me.component';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [MeComponent],
  imports: [IonicPageModule.forChild(MeComponent)],
  entryComponents: [
    MeComponent
  ]
})
export class MeComponentModule { }
