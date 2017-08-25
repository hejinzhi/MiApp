import { NgModule } from '@angular/core';
import { SaleMonthComponent } from './sale-month.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TableComponentModule } from '../table/table.component.module';

@NgModule({
  declarations: [SaleMonthComponent],
  imports: [TableComponentModule, IonicPageModule.forChild(SaleMonthComponent), TranslateModule.forChild()],
  entryComponents: [
    SaleMonthComponent
  ]
})
export class SaleMonthComponentModule { }
