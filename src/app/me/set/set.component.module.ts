import { NgModule } from '@angular/core';
import { SetComponent } from './set.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [SetComponent],
    imports: [IonicPageModule.forChild(SetComponent), TranslateModule.forChild()],
    entryComponents: [
        SetComponent
    ]
})
export class SetComponentModule { }
