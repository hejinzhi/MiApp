import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ListFilterComponent } from './list-filter.component';

import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  imports: [IonicModule, PipesModule, TranslateModule.forChild()],
  declarations: [ListFilterComponent],
  exports: [ListFilterComponent]
})
export class ListFilterComponentModule { }
