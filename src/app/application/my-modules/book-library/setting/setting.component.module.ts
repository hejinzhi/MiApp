import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SettingComponent } from './setting.component';

@NgModule({
    declarations: [SettingComponent],
    imports: [IonicPageModule.forChild(SettingComponent), TranslateModule.forChild()],
    entryComponents: [
        SettingComponent
    ]
})
export class SettingComponentModule { }
