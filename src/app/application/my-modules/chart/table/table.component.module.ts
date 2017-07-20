import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { TableComponent } from './table.component';

@NgModule({
  imports: [IonicModule],
  declarations: [TableComponent],
  exports: [TableComponent]
})
export class TableComponentModule { }
