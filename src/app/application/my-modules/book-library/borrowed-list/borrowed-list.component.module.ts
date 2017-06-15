import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BorrowedListComponent } from './borrowed-list.component';
import { BookListComponentModule } from '../book-list/book-list.component.module';

@NgModule({
    declarations: [BorrowedListComponent],
    imports: [BookListComponentModule, IonicPageModule.forChild(BorrowedListComponent)],
    entryComponents: [
        BorrowedListComponent
    ]
})
export class BorrowedListComponenttModule { }
