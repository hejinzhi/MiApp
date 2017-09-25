import { LocalStorageService } from './../../../../../core/services/localStorage.service';
import { SearchEmpComponentModule } from './../../../../../shared/components/search-emp/search-emp.component.module';
import { SharedModule } from './../../../../../shared/shared.module';
import { ExceptionDetailComponent } from './exception-detail.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicPageModule.forChild(ExceptionDetailComponent),
        TranslateModule.forChild(),
        SharedModule,
        SearchEmpComponentModule
    ],
    exports: [],
    declarations: [ExceptionDetailComponent],
    providers: [LocalStorageService],
    entryComponents: [
        ExceptionDetailComponent
    ]
})
export class ExceptionDetailComponentModule { }


