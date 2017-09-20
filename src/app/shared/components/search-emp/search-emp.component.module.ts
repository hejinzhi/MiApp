import { SearchEmpComponent } from './search-emp.component';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipe/pipes.module';

@NgModule({
  declarations: [SearchEmpComponent],
  imports: [IonicPageModule.forChild(SearchEmpComponent), TranslateModule.forChild(), PipesModule],
  entryComponents: [
    SearchEmpComponent
  ],
  exports: [SearchEmpComponent],
  providers: []
})
export class SearchEmpComponentModule { }