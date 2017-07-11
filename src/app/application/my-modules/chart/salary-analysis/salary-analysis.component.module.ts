import { NgModule } from '@angular/core';
import { SalaryAnalysisComponent } from './salary-analysis.component';
import { IonicPageModule } from 'ionic-angular';
import { DirectivesModule } from '../shared/directive/directives.module';

@NgModule({
  declarations: [SalaryAnalysisComponent],
  imports: [IonicPageModule.forChild(SalaryAnalysisComponent), DirectivesModule],
  entryComponents: [
    SalaryAnalysisComponent
  ]
})
export class SalaryAnalysisComponentModule { }
