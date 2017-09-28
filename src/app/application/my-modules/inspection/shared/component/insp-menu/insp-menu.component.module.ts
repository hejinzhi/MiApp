import { NgModule } from '@angular/core';
import { InspMenuComponent } from './insp-menu.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [InspMenuComponent],
  imports: [IonicPageModule.forChild(InspMenuComponent),  TranslateModule.forChild()],
  entryComponents: [
    InspMenuComponent
  ]
})
export class InspMenuComponentModule { }
