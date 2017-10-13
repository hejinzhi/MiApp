import { CheckNotesComponent } from './check-notes.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicPageModule.forChild(CheckNotesComponent),
        TranslateModule.forChild(),
    ],
    exports: [],
    declarations: [CheckNotesComponent],
    providers: [],
    entryComponents: [
        CheckNotesComponent
    ]
})
export class CheckNotesComponentModule { }