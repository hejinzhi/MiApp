import { SharedModule } from './../../../../../shared/shared.module';
// import { GridComponentModule } from './grid/grid.component.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { EquipScheduleComponent } from './equip-schedule.component';


@NgModule({
    imports: [
        IonicPageModule.forChild(EquipScheduleComponent),
        TranslateModule.forChild(),
        SharedModule
    ],
    exports: [],
    declarations: [EquipScheduleComponent,
    EquipScheduleComponent
],
    providers: [],
    entryComponents: [
        EquipScheduleComponent
    ]
})
export class EquipScheduleComponentModule { }


