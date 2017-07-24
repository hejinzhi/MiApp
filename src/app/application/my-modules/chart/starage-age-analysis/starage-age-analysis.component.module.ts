import { NgModule } from '@angular/core';
import { StarageAgeAnalysisComponent } from './starage-age-analysis.component';
import { TableComponentModule } from '../table/table.component.module';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [StarageAgeAnalysisComponent],
  imports: [ TableComponentModule, IonicPageModule.forChild(StarageAgeAnalysisComponent)],
  entryComponents: [
    StarageAgeAnalysisComponent
  ]
})
export class StarageAgeAnalysisComponentModule { }
