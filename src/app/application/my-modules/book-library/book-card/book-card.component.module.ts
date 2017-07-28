import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';
import { BookCardComponent } from './book-card.component';
import { BookListComponentModule } from '../book-list/book-list.component.module';

@NgModule({
    imports: [IonicModule, BookListComponentModule, TranslateModule.forChild()],
    declarations: [BookCardComponent],
    exports: [BookCardComponent]
})
export class BookCardComponentModule { }
