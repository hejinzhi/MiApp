import { AdminCheckComponent } from './admin-check.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicPageModule.forChild(AdminCheckComponent),
        TranslateModule.forChild(),
    ],
    exports: [],
    declarations: [AdminCheckComponent],
    providers: [],
    entryComponents: [
        AdminCheckComponent
    ]
})
export class AdminCheckComponentModule { }