import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingComponent } from './setting.component';

@NgModule({
    declarations: [SettingComponent],
    imports: [IonicPageModule.forChild(SettingComponent)],
    entryComponents: [
        SettingComponent
    ]
})
export class SettingComponentModule { }
