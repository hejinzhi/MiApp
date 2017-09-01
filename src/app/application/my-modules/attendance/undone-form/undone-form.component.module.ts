import { NgModule } from '@angular/core';
import { UndoneFormComponent } from './undone-form.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [UndoneFormComponent],
  imports: [IonicPageModule.forChild(UndoneFormComponent), PipesModule, TranslateModule.forChild()],
  entryComponents: [
    UndoneFormComponent
  ]
})
export class UndoneFormComponentModule { }
