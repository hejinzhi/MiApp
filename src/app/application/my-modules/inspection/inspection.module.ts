import { InspectionService } from './shared/service/inspection.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';


import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [CommonModule, IonicModule, SharedModule],
    providers: [InspectionService]
})
export class InspectionModule { }
