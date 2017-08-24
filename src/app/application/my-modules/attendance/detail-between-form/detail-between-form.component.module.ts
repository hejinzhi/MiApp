import { NgModule } from '@angular/core';
import { DetailBetweenFormComponent } from './detail-between-form.component';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [DetailBetweenFormComponent],
  imports: [IonicPageModule.forChild(DetailBetweenFormComponent), PipesModule],
  entryComponents: [
    DetailBetweenFormComponent
  ]
})
export class DetailBetweenFormComponentModule { }
