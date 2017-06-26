import { NgModule } from '@angular/core';
import { ChartComponent } from './chart.component';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from './components.module';

@NgModule({
  declarations: [ChartComponent],
  imports: [IonicPageModule.forChild(ChartComponent)],
  entryComponents: [
    ChartComponent
  ]
})
export class ChartComponentModule { }
