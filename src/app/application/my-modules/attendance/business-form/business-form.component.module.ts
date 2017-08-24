import { NgModule } from '@angular/core';
import { BusinessFormComponent } from './business-form.component';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [BusinessFormComponent],
  imports: [IonicPageModule.forChild(BusinessFormComponent), PipesModule],
  entryComponents: [
    BusinessFormComponent
  ]
})
export class BusinessFormComponentModule { }
