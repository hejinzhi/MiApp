import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../shared/shared.module';
import { ApplicationComponent } from './application.component';
import { MoreApplicationComponent } from './more-application/more-application.component';
import { ApplicationService } from './shared/service/application.service';

import { BookLibraryModule } from './my-modules/book-library/book-library.module';
import { AttendanceModule } from './my-modules/attendance/attendance.module';
import { ApplicationGridComponent } from './application-grid/application-grid.component';


@NgModule({
    imports: [CommonModule, IonicModule, SharedModule, BookLibraryModule, AttendanceModule],
    declarations: [ApplicationComponent, MoreApplicationComponent, ApplicationGridComponent],
    exports: [ApplicationComponent, MoreApplicationComponent, ApplicationGridComponent],
    entryComponents: [ApplicationComponent, MoreApplicationComponent, ApplicationGridComponent],
    providers: [ApplicationService]
})
export class ApplicationModule { }
