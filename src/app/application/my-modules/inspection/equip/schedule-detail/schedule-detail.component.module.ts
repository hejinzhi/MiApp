import { SharedModule } from './../../../../../shared/shared.module';
// import { GridComponentModule } from './grid/grid.component.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ScheduleDetailComponent } from './schedule-detail.component';


@NgModule({
    imports: [
        IonicPageModule.forChild(ScheduleDetailComponent),
        TranslateModule.forChild(),
        SharedModule
    ],
    exports: [],
    declarations: [ScheduleDetailComponent],
    providers: [],
    entryComponents: [
        ScheduleDetailComponent
    ]
})
export class ScheduleDetailComponentModule { }


