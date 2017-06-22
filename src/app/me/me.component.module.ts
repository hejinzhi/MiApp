import { NgModule } from '@angular/core';
import { MeComponent } from './me.component';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [MeComponent],
  imports: [IonicPageModule.forChild(MeComponent), PipesModule],
  entryComponents: [
    MeComponent
  ]
})
export class MeComponentModule { }
