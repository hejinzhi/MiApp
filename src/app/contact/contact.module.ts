import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from './contact.component';

@NgModule({
    imports: [CommonModule, IonicModule, SharedModule],
    declarations: [ContactComponent],
    entryComponents: [ContactComponent],
    exports: [ContactComponent],
    providers: []
})
export class ContactModule { }
