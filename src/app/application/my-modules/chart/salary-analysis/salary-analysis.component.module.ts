import { NgModule } from '@angular/core';
import { SalaryAnalysisComponent } from './salary-analysis.component';
import { IonicPageModule } from 'ionic-angular';
import { TableComponentModule } from '../table/table.component.module';

@NgModule({
  declarations: [SalaryAnalysisComponent],
  imports: [TableComponentModule, IonicPageModule.forChild(SalaryAnalysisComponent)],
  entryComponents: [
    SalaryAnalysisComponent
  ]
})
export class SalaryAnalysisComponentModule { }
