import { NgModule } from '@angular/core';
import { SaleComponent } from './sale.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SaleComponent],
  imports: [IonicPageModule.forChild(SaleComponent), TranslateModule.forChild()],
  entryComponents: [
    SaleComponent
  ]
})
export class SaleComponentModule { }
