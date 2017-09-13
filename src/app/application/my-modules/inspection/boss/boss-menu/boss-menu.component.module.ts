import { BossMenuComponent } from './boss-menu.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicPageModule.forChild(BossMenuComponent),
        TranslateModule.forChild(),
    ],
    exports: [],
    declarations: [BossMenuComponent],
    providers: [],
    entryComponents: [
        BossMenuComponent
    ]
})
export class BossMenuComponentModule { }


