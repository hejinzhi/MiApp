import { NgModule } from '@angular/core';
import { FormListComponent } from './form-list.component';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../shared/pipe/pipes.module'

@NgModule({
  declarations: [FormListComponent],
  imports: [PipesModule,IonicPageModule.forChild(FormListComponent)],
  entryComponents: [
    FormListComponent
  ]
})
export class FormListComponentModule { }
