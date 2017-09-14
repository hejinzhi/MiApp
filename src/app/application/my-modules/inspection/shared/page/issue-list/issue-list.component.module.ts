import { IssueListComponent } from './issue-list.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicPageModule.forChild(IssueListComponent),
        TranslateModule.forChild(),
    ],
    exports: [],
    declarations: [IssueListComponent],
    providers: [],
    entryComponents: [
        IssueListComponent
    ]
})
export class IssueListComponentModule { }