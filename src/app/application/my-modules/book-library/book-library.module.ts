import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { SharedModule } from '../../../shared/shared.module';
import { BookLibraryService } from './shared/service/book-library.service';

@NgModule({
    imports: [CommonModule, IonicModule, SharedModule],
    providers: [BookLibraryService, BarcodeScanner]
})
export class BookLibraryModule { }
