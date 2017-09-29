import { NgModule } from '@angular/core';
import { InspSearchComponent } from './insp-search.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [InspSearchComponent],
  imports: [IonicPageModule.forChild(InspSearchComponent),  TranslateModule.forChild()],
  entryComponents: [
    InspSearchComponent
  ]
})
export class InspSearchComponentModule { }
