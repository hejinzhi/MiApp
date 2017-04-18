import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { SharedModule } from '../../../shared/shared.module';
import { BookLibraryComponent } from '../book-library/book-library.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookLibraryService } from './shared/service/book-library.service';
import { SettingComponent } from './setting/setting.component';
import { BookCardComponent } from './book-card/book-card.component';
import { BorrowedListComponent } from './borrowed-list/borrowed-list.component';

@NgModule({
    imports: [CommonModule, IonicModule, SharedModule],
    declarations: [BookLibraryComponent, BookListComponent, BookDetailComponent, SettingComponent, BookCardComponent, BorrowedListComponent],
    exports: [BookLibraryComponent, BookListComponent, BookDetailComponent, SettingComponent, BookCardComponent, BorrowedListComponent],
    entryComponents: [BookLibraryComponent, BookListComponent, BookDetailComponent, SettingComponent, BookCardComponent, BorrowedListComponent],
    providers: [BookLibraryService, BarcodeScanner]
})
export class BookLibraryModule { }
