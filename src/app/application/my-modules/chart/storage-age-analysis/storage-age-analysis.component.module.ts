import { NgModule } from '@angular/core';
import { StorageAgeAnalysisComponent } from './storage-age-analysis.component';
import { TableComponentModule } from '../table/table.component.module';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [StorageAgeAnalysisComponent],
  imports: [ TableComponentModule, IonicPageModule.forChild(StorageAgeAnalysisComponent), TranslateModule.forChild()],
  entryComponents: [
    StorageAgeAnalysisComponent
  ]
})
export class StorageAgeAnalysisComponentModule { }
