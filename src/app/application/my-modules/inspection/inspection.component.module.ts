import { InspectionComponent } from './inspection.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [InspectionComponent],
    imports: [
        IonicPageModule.forChild(InspectionComponent),
        TranslateModule.forChild()
    ],
    entryComponents: [
        InspectionComponent
    ]
})
export class InspectionComponentModule { }
