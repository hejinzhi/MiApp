import { NgModule } from '@angular/core';
import { OverTimeFormComponent } from './over-time-form.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../shared/pipe/pipes.module';
import { BackButtonComponentModule } from '../../../.../../../shared/components/back-button/back-button.component.module';

@NgModule({
  declarations: [OverTimeFormComponent],
  imports: [IonicPageModule.forChild(OverTimeFormComponent), PipesModule, TranslateModule.forChild(), BackButtonComponentModule],
  entryComponents: [
    OverTimeFormComponent
  ]
})
export class OverTimeFormComponentModule { }
