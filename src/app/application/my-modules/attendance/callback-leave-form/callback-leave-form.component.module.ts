import { NgModule } from '@angular/core';
import { CallbackLeaveFormComponent } from './callback-leave-form.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [CallbackLeaveFormComponent],
  imports: [IonicPageModule.forChild(CallbackLeaveFormComponent), PipesModule, TranslateModule.forChild()],
  entryComponents: [
    CallbackLeaveFormComponent
  ]
})
export class CallbackLeaveFormComponentModule { }
