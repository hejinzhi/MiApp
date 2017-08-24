import { NgModule } from '@angular/core';
import { SearchFormComponent } from './search-form.component';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [SearchFormComponent],
  imports: [IonicPageModule.forChild(SearchFormComponent), PipesModule],
  entryComponents: [
    SearchFormComponent
  ]
})
export class SearchFormComponentModule { }
