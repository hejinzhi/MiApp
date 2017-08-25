import { NgModule } from '@angular/core';
import { HumanResourcesComponent } from './human-resources.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [HumanResourcesComponent],
  imports: [IonicPageModule.forChild(HumanResourcesComponent), TranslateModule.forChild()],
  entryComponents: [
    HumanResourcesComponent
  ]
})
export class HumanResourcesComponentModule { }
