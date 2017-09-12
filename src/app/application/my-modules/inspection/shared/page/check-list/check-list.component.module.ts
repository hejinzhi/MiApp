import { CheckListComponent } from './check-list.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicPageModule.forChild(CheckListComponent),
        TranslateModule.forChild(),
    ],
    exports: [],
    declarations: [CheckListComponent],
    providers: [],
    entryComponents: [
        CheckListComponent
    ]
})
export class CheckListComponentModule { }