import { NgModule } from '@angular/core';
import { FormMenuComponent } from './form-menu.component';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [FormMenuComponent],
  imports: [IonicPageModule.forChild(FormMenuComponent), PipesModule],
  entryComponents: [
    FormMenuComponent
  ]
})
export class FormMenuComponentModule { }
