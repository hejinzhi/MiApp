import { NgModule } from '@angular/core';
import { ObsPoComponent } from './obs-po.component';
import { TableComponentModule } from '../table/table.component.module';
import { IonicPageModule } from 'ionic-angular';
import { DirectivesModule } from '../shared/directive/directives.module';

@NgModule({
  declarations: [ObsPoComponent ],
  imports: [TableComponentModule,IonicPageModule.forChild(ObsPoComponent), DirectivesModule],
  entryComponents: [
    ObsPoComponent
  ]
})
export class ObsPoComponentModule { }
