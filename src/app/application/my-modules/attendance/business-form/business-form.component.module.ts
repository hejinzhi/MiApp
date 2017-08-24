import { NgModule } from '@angular/core';
import { BusinessFormComponent } from './business-form.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [BusinessFormComponent],
  imports: [IonicPageModule.forChild(BusinessFormComponent), PipesModule, TranslateModule.forChild()],
  entryComponents: [
    BusinessFormComponent
  ]
})
export class BusinessFormComponentModule { }
