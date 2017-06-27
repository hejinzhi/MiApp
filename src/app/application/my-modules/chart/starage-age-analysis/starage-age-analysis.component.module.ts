import { NgModule } from '@angular/core';
import { StarageAgeAnalysisComponent } from './starage-age-analysis.component';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [StarageAgeAnalysisComponent],
  imports: [IonicPageModule.forChild(StarageAgeAnalysisComponent)],
  entryComponents: [
    StarageAgeAnalysisComponent
  ]
})
export class StarageAgeAnalysisComponentModule { }
