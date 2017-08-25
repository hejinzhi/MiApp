import { NgModule } from '@angular/core';
import { ChartComponent } from './chart.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from './components.module';

@NgModule({
  declarations: [ChartComponent],
  imports: [IonicPageModule.forChild(ChartComponent), TranslateModule.forChild()],
  entryComponents: [
    ChartComponent
  ]
})
export class ChartComponentModule { }
