import { SharedModule } from './../../../../../shared/shared.module';
import { CheckboxComponent } from './checkbox.component';


import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicPageModule.forChild(CheckboxComponent),
        TranslateModule.forChild(),
        SharedModule
    ],
    exports: [CheckboxComponent],
    declarations: [CheckboxComponent],
    providers: [],
    entryComponents: [
        CheckboxComponent
    ]
})
export class CheckboxComponentModule { }


