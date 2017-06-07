import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from './contact.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ContactService } from './shared/service/contact.service';

@NgModule({
    imports: [CommonModule, IonicModule, SharedModule],
    declarations: [ContactComponent, SearchResultComponent],
    entryComponents: [ContactComponent, SearchResultComponent],
    exports: [ContactComponent, SearchResultComponent],
    providers: [ContactService]
})
export class ContactModule { }
