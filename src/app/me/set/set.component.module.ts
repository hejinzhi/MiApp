import { NgModule } from '@angular/core';
import { SetComponent } from './set.component';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [SetComponent],
  imports: [IonicPageModule.forChild(SetComponent)],
  entryComponents: [
    SetComponent
  ]
})
export class SetComponentModule { }
