import { NgModule } from '@angular/core';
import { BorrowRequestComponent } from './borrow-request.component';
import { IonicPageModule } from 'ionic-angular';
import { BookCardComponentModule } from '../book-card/book-card.component.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [BorrowRequestComponent],
    imports: [BookCardComponentModule, IonicPageModule.forChild(BorrowRequestComponent), TranslateModule.forChild()],
    entryComponents: [
        BorrowRequestComponent
    ]
})
export class BorrowRequestComponentModule { }
