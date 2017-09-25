import { SearchColleagueComponentModule } from './../../../../../shared/components/search-colleague/search-colleague.component.module';
import { PhotoViewComponentModule } from './../../../../../shared/components/photo-view/photo-view.component.module';
import { BossScheduleComponent } from './boss-schedule.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicPageModule.forChild(BossScheduleComponent),
        TranslateModule.forChild(),
        PhotoViewComponentModule,
        SearchColleagueComponentModule
    ],
    exports: [],
    declarations: [BossScheduleComponent],
    providers: [],
    entryComponents: [
        BossScheduleComponent
    ]
})
export class BossReportComponentModule { }