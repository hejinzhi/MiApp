import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { BookListComponent } from './book-list.component';
import { PipesModule } from '../../../../shared/pipe/pipes.module';

@NgModule({
    imports: [IonicModule, PipesModule, TranslateModule.forChild()],
    declarations: [BookListComponent],
    exports: [BookListComponent]
})
export class BookListComponentModule { }
