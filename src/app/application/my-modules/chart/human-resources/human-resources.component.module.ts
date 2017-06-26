import { NgModule } from '@angular/core';
import { HumanResourcesComponent } from './human-resources.component';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [HumanResourcesComponent],
  imports: [IonicPageModule.forChild(HumanResourcesComponent)],
  entryComponents: [
    HumanResourcesComponent
  ]
})
export class HumanResourcesComponentModule { }
