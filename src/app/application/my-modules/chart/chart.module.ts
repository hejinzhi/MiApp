import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../../../shared/shared.module';
import { ChartService } from './shared/service/chart.service';

@NgModule({
    imports: [CommonModule, IonicModule, SharedModule],
    providers: [ChartService]
})
export class ChartModule { }
