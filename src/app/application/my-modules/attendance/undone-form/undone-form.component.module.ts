import { NgModule } from '@angular/core';
import { UndoneFormComponent } from './undone-form.component';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [UndoneFormComponent],
  imports: [IonicPageModule.forChild(UndoneFormComponent), PipesModule],
  entryComponents: [
    UndoneFormComponent
  ]
})
export class UndoneFormComponentModule { }
