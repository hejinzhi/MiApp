import { NgModule } from '@angular/core';
import { SaleMonthComponent } from './sale-month.component';
import { IonicPageModule } from 'ionic-angular';
import { TableComponentModule } from '../table/table.component.module';

@NgModule({
  declarations: [SaleMonthComponent],
  imports: [TableComponentModule, IonicPageModule.forChild(SaleMonthComponent)],
  entryComponents: [
    SaleMonthComponent
  ]
})
export class SaleMonthComponentModule { }
