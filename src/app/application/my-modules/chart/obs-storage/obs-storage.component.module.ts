import { NgModule } from '@angular/core';
import { ObsStorageComponent } from './obs-storage.component';
import { TableComponentModule } from '../table/table.component.module';
import { IonicPageModule } from 'ionic-angular';
import { DirectivesModule } from '../shared/directive/directives.module';

@NgModule({
  declarations: [ObsStorageComponent ],
  imports: [TableComponentModule,IonicPageModule.forChild(ObsStorageComponent), DirectivesModule],
  entryComponents: [
    ObsStorageComponent
  ]
})
export class ObsStorageComponentModule { }
