import { NgModule } from '@angular/core';
import { DimissionAnalysisComponent } from './dimission-analysis.component';
import { IonicPageModule } from 'ionic-angular';
import { DirectivesModule } from '../shared/directive/directives.module';
import { TableComponentModule } from '../table/table.component.module';

@NgModule({
  declarations: [DimissionAnalysisComponent],
  imports: [TableComponentModule, IonicPageModule.forChild(DimissionAnalysisComponent), DirectivesModule],
  entryComponents: [
    DimissionAnalysisComponent
  ]
})
export class DimissionAnalysisComponentModule { }
