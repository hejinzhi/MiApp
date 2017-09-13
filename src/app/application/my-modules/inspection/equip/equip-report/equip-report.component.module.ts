import { PhotoViewComponentModule } from './../../../../../shared/components/photo-view/photo-view.component.module';
import { EquipReportComponent } from './equip-report.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicPageModule.forChild(EquipReportComponent),
        TranslateModule.forChild(),
        PhotoViewComponentModule
    ],
    exports: [],
    declarations: [EquipReportComponent],
    providers: [],
    entryComponents: [
        EquipReportComponent
    ]
})
export class EquipReportComponentModule { }