import { NgModule } from '@angular/core';
import { SalaryAnalysisComponent } from './salary-analysis.component';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [SalaryAnalysisComponent],
  imports: [IonicPageModule.forChild(SalaryAnalysisComponent)],
  entryComponents: [
    SalaryAnalysisComponent
  ]
})
export class SalaryAnalysisComponentModule { }
