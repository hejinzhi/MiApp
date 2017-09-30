import { IpqaItemComponentModule } from './../../shared/component/ipqa-item/ipqa-item.component.module';
import { AllProblemsComponent } from './all-problems.component';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    declarations: [AllProblemsComponent],
    imports: [IonicPageModule.forChild(AllProblemsComponent), TranslateModule.forChild(), IpqaItemComponentModule],
    entryComponents: [
        AllProblemsComponent
    ],
    exports: [AllProblemsComponent],
    providers: []
})
export class AllProblemsComponentModule { }