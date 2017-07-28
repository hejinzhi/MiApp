import { NgModule } from '@angular/core';
import { BookLibraryComponent } from './book-library.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { BookListComponentModule } from './book-list/book-list.component.module';

@NgModule({
    declarations: [BookLibraryComponent],
    imports: [
        BookListComponentModule,
        IonicPageModule.forChild(BookLibraryComponent),
        TranslateModule.forChild()
    ],
    entryComponents: [
        BookLibraryComponent
    ]
})
export class BookLibraryComponentModule { }
