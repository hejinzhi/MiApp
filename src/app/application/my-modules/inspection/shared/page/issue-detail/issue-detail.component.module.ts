import { SearchColleagueComponentModule } from './../../../../../../shared/components/search-colleague/search-colleague.component.module';
import { PhotoViewComponentModule } from './../../../../../../shared/components/photo-view/photo-view.component.module';
import { IssueDetailComponent } from './issue-detail.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicPageModule.forChild(IssueDetailComponent),
        TranslateModule.forChild(),
        PhotoViewComponentModule,
        SearchColleagueComponentModule
    ],
    exports: [],
    declarations: [IssueDetailComponent],
    providers: [],
    entryComponents: [
        IssueDetailComponent
    ]
})
export class IssueDetailComponentModule { }