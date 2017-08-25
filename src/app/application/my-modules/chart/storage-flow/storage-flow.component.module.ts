import { NgModule } from '@angular/core';
import { StorageFlowComponent } from './storage-flow.component';
import { TableComponentModule } from '../table/table.component.module';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../shared/directive/directives.module';

@NgModule({
  declarations: [StorageFlowComponent ],
  imports: [TableComponentModule,IonicPageModule.forChild(StorageFlowComponent), DirectivesModule, TranslateModule.forChild()],
  entryComponents: [
    StorageFlowComponent
  ]
})
export class StorageFlowComponentModule { }
