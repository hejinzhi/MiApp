import { NgModule } from '@angular/core';
import { ManufactureComponent } from './manufacture.component';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [ManufactureComponent],
  imports: [IonicPageModule.forChild(ManufactureComponent), TranslateModule.forChild()],
  entryComponents: [
    ManufactureComponent
  ]
})
export class ManufactureComponentModule { }
