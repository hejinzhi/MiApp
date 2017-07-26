import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookDetailComponent } from './book-detail.component';
import { BookListComponentModule } from '../book-list/book-list.component.module';
import { PipesModule } from '../../../../shared/pipe/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [BookDetailComponent],
    imports: [BookListComponentModule, IonicPageModule.forChild(BookDetailComponent), PipesModule, TranslateModule.forChild()],
    entryComponents: [
        BookDetailComponent
    ]
})
export class BookDetailComponentModule { }
