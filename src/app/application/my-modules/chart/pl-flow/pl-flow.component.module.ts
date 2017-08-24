import { NgModule } from '@angular/core';
import { PlFlowComponent } from './pl-flow.component';
import { IonicPageModule } from 'ionic-angular';
import { TableComponentModule } from '../table/table.component.module';

@NgModule({
  declarations: [PlFlowComponent],
  imports: [TableComponentModule, IonicPageModule.forChild(PlFlowComponent)],
  entryComponents: [
    PlFlowComponent
  ]
})
export class PlFlowComponentModule { }
