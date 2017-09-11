import { SharedModule } from './../../../../../shared/shared.module';
import { ExceptionDetailComponent } from './exception-detail.component';

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicPageModule.forChild(ExceptionDetailComponent),
        TranslateModule.forChild(),
        SharedModule
    ],
    exports: [],
    declarations: [ExceptionDetailComponent],
    providers: [],
    entryComponents: [
        ExceptionDetailComponent
    ]
})
export class ExceptionDetailComponentModule { }


