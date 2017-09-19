import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SearchColleagueComponent } from './search-colleague.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipe/pipes.module'; 

@NgModule({
  declarations: [SearchColleagueComponent],
  imports: [IonicPageModule.forChild(SearchColleagueComponent), TranslateModule.forChild(), PipesModule],
  entryComponents: [
    SearchColleagueComponent
  ],
  exports: [SearchColleagueComponent],
  providers: []
})
export class SearchColleagueComponentModule { }