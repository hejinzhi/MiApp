import { NgModule } from '@angular/core';
import { DetailOnFormComponent } from './detail-on-form.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [DetailOnFormComponent],
  imports: [IonicPageModule.forChild(DetailOnFormComponent), PipesModule, TranslateModule.forChild()],
  entryComponents: [
    DetailOnFormComponent
  ]
})
export class DetailOnFormComponentModule { }
