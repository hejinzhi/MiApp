import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PipesModule } from '../shared/pipe/pipes.module';
import { TableComponent } from './table.component';

@NgModule({
  imports: [IonicModule, PipesModule],
  declarations: [TableComponent],
  exports: [TableComponent]
})
export class TableComponentModule { }
