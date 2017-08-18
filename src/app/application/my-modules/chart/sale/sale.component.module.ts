import { NgModule } from '@angular/core';
import { SaleComponent } from './sale.component';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [SaleComponent],
  imports: [IonicPageModule.forChild(SaleComponent)],
  entryComponents: [
    SaleComponent
  ]
})
export class SaleComponentModule { }
