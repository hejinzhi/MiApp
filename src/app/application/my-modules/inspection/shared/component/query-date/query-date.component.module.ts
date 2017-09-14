import { SharedModule } from './../../../../../../shared/shared.module';
import { QueryDateComponent } from './query-date.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    imports: [
        IonicPageModule.forChild(QueryDateComponent),
        TranslateModule.forChild(),
        SharedModule
    ],
    exports: [],
    declarations: [QueryDateComponent],
    providers: [],
    entryComponents: [
        QueryDateComponent
    ]
})
export class QueryDateComponentModule { }

