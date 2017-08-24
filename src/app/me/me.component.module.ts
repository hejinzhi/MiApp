import { NgModule } from '@angular/core';
import { MeComponent } from './me.component';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../shared/pipe/pipes.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [MeComponent],
  imports: [IonicPageModule.forChild(MeComponent), PipesModule, TranslateModule.forChild()],
  entryComponents: [
    MeComponent
  ],
  providers: []
})
export class MeComponentModule { }
