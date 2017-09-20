import { ListComponent } from './list.component';
import { SharedModule } from './../../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [ListComponent],
    imports: [
        IonicPageModule.forChild(ListComponent),
        TranslateModule.forChild(),
        SharedModule
    ],
    entryComponents: [
        ListComponent
    ]
})
export class ListComponentModule { }
