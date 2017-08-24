import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { ListFilterComponent } from './list-filter.component';

import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  imports: [IonicModule, PipesModule],
  declarations: [ListFilterComponent],
  exports: [ListFilterComponent]
})
export class ListFilterComponentModule { }
