import { EquipItemComponentModule } from './../../component/equip-item/equip-item.component.module';
import { BossItemComponentModule } from './../../component/boss-item/boss-item.component.module';
import { AdminCheckComponent } from './admin-check.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicPageModule.forChild(AdminCheckComponent),
        TranslateModule.forChild(),
        BossItemComponentModule,
        EquipItemComponentModule
    ],
    exports: [],
    declarations: [AdminCheckComponent],
    providers: [],
    entryComponents: [
        AdminCheckComponent
    ]
})
export class AdminCheckComponentModule { }