import { NgModule } from '@angular/core';
import { SaleDayComponent } from './sale-day.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TableComponentModule } from '../table/table.component.module';

@NgModule({
  declarations: [SaleDayComponent],
  imports: [TableComponentModule, IonicPageModule.forChild(SaleDayComponent), TranslateModule.forChild()],
  entryComponents: [
    SaleDayComponent
  ]
})
export class SaleDayComponentModule { }
