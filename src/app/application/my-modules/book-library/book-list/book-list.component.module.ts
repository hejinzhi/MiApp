import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { BookListComponent } from './book-list.component';

@NgModule({
    imports: [IonicModule],
    declarations: [BookListComponent],
    exports: [BookListComponent]
})
export class BookListComponentModule { }
