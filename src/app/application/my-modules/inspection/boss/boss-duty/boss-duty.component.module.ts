import { QueryDateComponentModule } from '../../shared/component/query-date/query-date.component.module';
import { PhotoViewComponentModule } from './../../../../../shared/components/photo-view/photo-view.component.module';
import { BossDutyComponent } from './boss-duty.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicPageModule.forChild(BossDutyComponent),
        TranslateModule.forChild(),
        PhotoViewComponentModule,
        QueryDateComponentModule
    ],
    exports: [],
    declarations: [BossDutyComponent],
    providers: [],
    entryComponents: [
        BossDutyComponent
    ]
})
export class BossDutyComponentModule { }