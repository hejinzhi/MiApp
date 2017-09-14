import { SharedModule } from './../../../../../shared/shared.module';
// import { GridComponentModule } from './grid/grid.component.module';
import { EquipsettingComponent } from './equipsetting.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { MultiPickerModule } from 'ion-multi-picker';

@NgModule({
    imports: [
        IonicPageModule.forChild(EquipsettingComponent),
        TranslateModule.forChild(),
        SharedModule,
        MultiPickerModule
    ],
    exports: [],
    declarations: [EquipsettingComponent],
    providers: [],
    entryComponents: [
        EquipsettingComponent
    ]
})
export class EquipComponentModule { }


