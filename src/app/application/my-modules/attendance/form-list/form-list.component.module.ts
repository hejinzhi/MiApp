import { NgModule } from '@angular/core';
import { FormListComponent } from './form-list.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../shared/pipe/pipes.module'
import { ListFilterComponentModule } from '../list-filter/list-filter.component.module';

@NgModule({
  declarations: [FormListComponent],
  imports: [ListFilterComponentModule, PipesModule,IonicPageModule.forChild(FormListComponent), TranslateModule.forChild()],
  entryComponents: [
    FormListComponent
  ]
})
export class FormListComponentModule { }
