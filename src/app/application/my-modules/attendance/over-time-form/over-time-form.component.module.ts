import { NgModule } from '@angular/core';
import { OverTimeFormComponent } from './over-time-form.component';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [OverTimeFormComponent],
  imports: [IonicPageModule.forChild(OverTimeFormComponent), PipesModule],
  entryComponents: [
    OverTimeFormComponent
  ]
})
export class OverTimeFormComponentModule { }
