import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from './contact.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactService } from './shared/service/contact.service';

@NgModule({
    imports: [CommonModule, IonicModule, SharedModule],
    declarations: [ContactComponent, SearchResultComponent, ContactDetailComponent, ContactListComponent],
    entryComponents: [ContactComponent, SearchResultComponent, ContactDetailComponent, ContactListComponent],
    exports: [ContactComponent, SearchResultComponent, ContactDetailComponent, ContactListComponent],
    providers: [ContactService]
})
export class ContactModule { }
