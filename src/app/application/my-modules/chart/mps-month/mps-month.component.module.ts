import { NgModule } from '@angular/core';
import { MpsMonthComponent } from './mps-month.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TableComponentModule } from '../table/table.component.module';

@NgModule({
  declarations: [MpsMonthComponent],
  imports: [TableComponentModule, IonicPageModule.forChild(MpsMonthComponent), TranslateModule.forChild()],
  entryComponents: [
    MpsMonthComponent
  ]
})
export class MpsMonthComponentModule { }
