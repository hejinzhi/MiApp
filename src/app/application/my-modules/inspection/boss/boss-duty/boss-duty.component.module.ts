import { PhotoViewComponentModule } from './../../../../../shared/components/photo-view/photo-view.component.module';
import { BossDutyComponent } from './boss-duty.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicPageModule.forChild(BossDutyComponent),
        TranslateModule.forChild(),
        PhotoViewComponentModule
    ],
    exports: [],
    declarations: [BossDutyComponent],
    providers: [],
    entryComponents: [
        BossDutyComponent
    ]
})
export class BossDutyComponentModule { }