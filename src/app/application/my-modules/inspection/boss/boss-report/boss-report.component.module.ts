import { PhotoViewComponentModule } from './../../../../../shared/components/photo-view/photo-view.component.module';
import { BossReportComponent } from './boss-report.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicPageModule.forChild(BossReportComponent),
        TranslateModule.forChild(),
        PhotoViewComponentModule
    ],
    exports: [],
    declarations: [BossReportComponent],
    providers: [],
    entryComponents: [
        BossReportComponent
    ]
})
export class BossReportComponentModule { }