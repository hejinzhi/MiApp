import { NgModule } from '@angular/core';
import { BookLibraryComponent } from './book-library.component';
import { IonicPageModule } from 'ionic-angular';
import { BookListComponentModule } from './book-list/book-list.component.module';

@NgModule({
    declarations: [BookLibraryComponent],
    imports: [BookListComponentModule, IonicPageModule.forChild(BookLibraryComponent)],
    entryComponents: [
        BookLibraryComponent
    ]
})
export class BookLibraryComponentModule { }
