import { NgModule } from '@angular/core';
import { FormMenuComponent } from './form-menu.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [FormMenuComponent],
  imports: [IonicPageModule.forChild(FormMenuComponent), PipesModule,  TranslateModule.forChild()],
  entryComponents: [
    FormMenuComponent
  ]
})
export class FormMenuComponentModule { }
