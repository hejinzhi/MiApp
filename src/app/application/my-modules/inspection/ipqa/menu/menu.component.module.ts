import { MenuComponent } from './menu.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicPageModule.forChild(MenuComponent),
        TranslateModule.forChild(),
    ],
    exports: [],
    declarations: [MenuComponent],
    providers: [],
    entryComponents: [
        MenuComponent
    ]
})
export class MenuComponentModule { }


