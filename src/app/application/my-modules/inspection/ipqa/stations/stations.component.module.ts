import { SharedModule } from './../../../../../shared/shared.module';
import { GridComponentModule } from './../grid/grid.component.module';
import { StationsComponent } from './stations.component';

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicPageModule.forChild(StationsComponent),
        TranslateModule.forChild(),
        GridComponentModule,
        SharedModule
    ],
    exports: [],
    declarations: [StationsComponent],
    providers: [],
    entryComponents: [
        StationsComponent
    ]
})
export class StationsComponentModule { }


