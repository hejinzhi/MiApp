import { SharedModule } from './../../../../../shared/shared.module';
// import { GridComponentModule } from './grid/grid.component.module';
import { EquipSettingComponent } from './equip-setting.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { MultiPickerModule } from 'ion-multi-picker';

@NgModule({
    imports: [
        IonicPageModule.forChild(EquipSettingComponent),
        TranslateModule.forChild(),
        SharedModule,
        MultiPickerModule
    ],
    exports: [],
    declarations: [EquipSettingComponent],
    providers: [],
    entryComponents: [
        EquipSettingComponent
    ]
})
export class EquipComponentModule { }


