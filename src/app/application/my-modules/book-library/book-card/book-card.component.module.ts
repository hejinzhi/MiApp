import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { BookCardComponent } from './book-card.component';
import { BookListComponentModule } from '../book-list/book-list.component.module';

@NgModule({
    imports: [IonicModule, BookListComponentModule],
    declarations: [BookCardComponent],
    exports: [BookCardComponent]
})
export class BookCardComponentModule { }
