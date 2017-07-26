import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BorrowedListComponent } from './borrowed-list.component';
import { BookListComponentModule } from '../book-list/book-list.component.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [BorrowedListComponent],
    imports: [BookListComponentModule, IonicPageModule.forChild(BorrowedListComponent), TranslateModule.forChild()],
    entryComponents: [
        BorrowedListComponent
    ]
})
export class BorrowedListComponenttModule { }
