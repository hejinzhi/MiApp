import { BossItemComponentModule } from './../../component/boss-item/boss-item.component.module';
import { EquipItemComponentModule } from './../../component/equip-item/equip-item.component.module';
import { IssueListComponent } from './issue-list.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicPageModule.forChild(IssueListComponent),
        TranslateModule.forChild(),
        BossItemComponentModule,
        EquipItemComponentModule
    ],
    exports: [],
    declarations: [IssueListComponent],
    providers: [],
    entryComponents: [
        IssueListComponent
    ]
})
export class IssueListComponentModule { }