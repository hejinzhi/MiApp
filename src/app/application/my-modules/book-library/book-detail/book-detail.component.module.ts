import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookDetailComponent } from './book-detail.component';
import { BookListComponentModule } from '../book-list/book-list.component.module';

@NgModule({
    declarations: [BookDetailComponent],
    imports: [BookListComponentModule, IonicPageModule.forChild(BookDetailComponent)],
    entryComponents: [
        BookDetailComponent
    ]
})
export class BookDetailComponentModule { }
