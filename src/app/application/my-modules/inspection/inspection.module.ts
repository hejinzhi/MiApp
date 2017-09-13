
import { InspectionService } from './ipqa/shared/service/inspection.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';


import { SharedModule } from '../../../shared/shared.module';
import { EquipService } from './equip/shared/service/equip.service';

@NgModule({
    imports: [CommonModule, IonicModule, SharedModule],
    providers: [InspectionService,EquipService]
})
export class InspectionModule { }
