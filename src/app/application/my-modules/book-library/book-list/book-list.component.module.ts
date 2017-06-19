import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { BookListComponent } from './book-list.component';
import { PipesModule } from '../../../../shared/pipe/pipes.module';

@NgModule({
    imports: [IonicModule, PipesModule],
    declarations: [BookListComponent],
    exports: [BookListComponent]
})
export class BookListComponentModule { }
