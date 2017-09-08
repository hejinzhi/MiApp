import { SharedModule } from './../../../../../shared/shared.module';
import { GridComponent } from './grid.component';

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicPageModule.forChild(GridComponent),
        TranslateModule.forChild(),
        SharedModule
    ],
    exports: [GridComponent],
    declarations: [GridComponent],
    providers: [],
    entryComponents: [
        GridComponent
    ]
})
export class GridComponentModule { }


