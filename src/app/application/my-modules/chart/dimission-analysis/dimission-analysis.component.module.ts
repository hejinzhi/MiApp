import { NgModule } from '@angular/core';
import { DimissionAnalysisComponent } from './dimission-analysis.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TableComponentModule } from '../table/table.component.module';

@NgModule({
  declarations: [DimissionAnalysisComponent],
  imports: [TableComponentModule, IonicPageModule.forChild(DimissionAnalysisComponent), TranslateModule.forChild()],
  entryComponents: [
    DimissionAnalysisComponent
  ]
})
export class DimissionAnalysisComponentModule { }
