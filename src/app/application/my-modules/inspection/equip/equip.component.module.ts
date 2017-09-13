import { SharedModule } from './../../../../shared/shared.module';
// import { GridComponentModule } from './grid/grid.component.module';
import { EquipComponent } from './equip.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    imports: [
        IonicPageModule.forChild(EquipComponent),
        TranslateModule.forChild(),
        SharedModule
    ],
    exports: [],
    declarations: [EquipComponent],
    providers: [],
    entryComponents: [
        EquipComponent
    ]
})
export class EquipComponentModule { }


