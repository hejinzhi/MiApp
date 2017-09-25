import { SharedModule } from './../../../../../../shared/shared.module';
import { QueryDateComponent } from './query-date.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { CommonService } from '../../service/common.service';


@NgModule({
    imports: [
        IonicPageModule.forChild(QueryDateComponent),
        TranslateModule.forChild(),
        SharedModule
    ],
    exports: [QueryDateComponent],
    declarations: [QueryDateComponent],
    providers: [CommonService],
    entryComponents: [
        QueryDateComponent
    ]
})
export class QueryDateComponentModule { }

