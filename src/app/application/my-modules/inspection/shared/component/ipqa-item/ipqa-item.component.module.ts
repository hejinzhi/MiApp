import { IpqaItemComponent } from './ipqa-item.component';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    declarations: [IpqaItemComponent],
    imports: [IonicPageModule.forChild(IpqaItemComponent), TranslateModule.forChild()],
    entryComponents: [
        IpqaItemComponent
    ],
    exports: [IpqaItemComponent],
    providers: []
})
export class IpqaItemComponentModule { }