import { SharedModule } from './../../../shared/shared.module';
import { PipesModule } from './../../../shared/pipe/pipes.module';
import { InspectionComponent } from './inspection.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [InspectionComponent],
    imports: [
        IonicPageModule.forChild(InspectionComponent),
        TranslateModule.forChild(),
        // PipesModule
        SharedModule
    ],
    entryComponents: [
        InspectionComponent
    ]
})
export class InspectionComponentModule { }
