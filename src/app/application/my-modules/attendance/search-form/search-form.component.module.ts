import { NgModule } from '@angular/core';
import { SearchFormComponent } from './search-form.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [SearchFormComponent],
  imports: [IonicPageModule.forChild(SearchFormComponent), PipesModule, TranslateModule.forChild()],
  entryComponents: [
    SearchFormComponent
  ]
})
export class SearchFormComponentModule { }
