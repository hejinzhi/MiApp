import { NgModule } from '@angular/core';
import { ObsStorageComponent } from './obs-storage.component';
import { TableComponentModule } from '../table/table.component.module';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../shared/directive/directives.module';

@NgModule({
  declarations: [ObsStorageComponent ],
  imports: [TableComponentModule,IonicPageModule.forChild(ObsStorageComponent), DirectivesModule, TranslateModule.forChild()],
  entryComponents: [
    ObsStorageComponent
  ]
})
export class ObsStorageComponentModule { }
