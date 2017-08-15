import { NgModule } from '@angular/core';
import { MpsMonthComponent } from './mps-month.component';
import { IonicPageModule } from 'ionic-angular';
import { TableComponentModule } from '../table/table.component.module';

@NgModule({
  declarations: [MpsMonthComponent],
  imports: [TableComponentModule, IonicPageModule.forChild(MpsMonthComponent)],
  entryComponents: [
    MpsMonthComponent
  ]
})
export class MpsMonthComponentModule { }
