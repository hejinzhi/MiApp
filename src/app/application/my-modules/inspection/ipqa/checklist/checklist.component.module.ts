import { SharedModule } from './../../../../../shared/shared.module';
import { CheckboxComponentModule } from '../checkbox/checkbox.component.module';
import { ChecklistComponent } from './checklist.component';



import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicPageModule.forChild(ChecklistComponent),
        TranslateModule.forChild(),
        SharedModule,
        CheckboxComponentModule
    ],
    exports: [],
    declarations: [ChecklistComponent],
    providers: [],
    entryComponents: [
        ChecklistComponent
    ]
})
export class ChecklistComponentModule { }


