import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from './contact.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { OrganizationComponent } from './organization/organization.component';
import { ContactService } from './shared/service/contact.service';
import { PipesModule } from '../shared/pipe/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, IonicModule, SharedModule, PipesModule, TranslateModule.forChild()],
    declarations: [ContactComponent, SearchResultComponent, ContactDetailComponent, ContactListComponent, OrganizationComponent],
    entryComponents: [ContactComponent, SearchResultComponent, ContactDetailComponent, ContactListComponent, OrganizationComponent],
    exports: [ContactComponent, SearchResultComponent, ContactDetailComponent, ContactListComponent, OrganizationComponent],
    providers: [ContactService]
})
export class ContactModule { }
