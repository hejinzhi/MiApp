import { NgModule } from '@angular/core';
import { ManufactureComponent } from './manufacture.component';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [ManufactureComponent],
  imports: [IonicPageModule.forChild(ManufactureComponent)],
  entryComponents: [
    ManufactureComponent
  ]
})
export class ManufactureComponentModule { }
