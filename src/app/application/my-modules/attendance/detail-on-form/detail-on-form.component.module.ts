import { NgModule } from '@angular/core';
import { DetailOnFormComponent } from './detail-on-form.component';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [DetailOnFormComponent],
  imports: [IonicPageModule.forChild(DetailOnFormComponent), PipesModule],
  entryComponents: [
    DetailOnFormComponent
  ]
})
export class DetailOnFormComponentModule { }
