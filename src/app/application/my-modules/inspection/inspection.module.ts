import { InspectionCommonService } from './shared/service/inspectionCommon.service';
import { BossService } from './boss/shared/service/boss.service';
import { InspectionService } from './ipqa/shared/service/inspection.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../../../shared/shared.module';
import { EquipService } from './equip/shared/service/equip.service';

@NgModule({
    declarations: [],
    imports: [CommonModule, IonicModule, SharedModule],
    providers: [InspectionService,EquipService,BossService,InspectionCommonService]
})
export class InspectionModule { }
