import { NgModule } from '@angular/core';
import { BorrowRequestComponent } from './borrow-request.component';
import { IonicPageModule } from 'ionic-angular';
import { BookCardComponentModule } from '../book-card/book-card.component.module';

@NgModule({
    declarations: [BorrowRequestComponent],
    imports: [BookCardComponentModule, IonicPageModule.forChild(BorrowRequestComponent)],
    entryComponents: [
        BorrowRequestComponent
    ]
})
export class BorrowRequestComponentModule { }
