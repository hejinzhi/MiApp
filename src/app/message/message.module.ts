import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../shared/shared.module';
import { MessageComponent } from './message.component';

@NgModule({
    imports: [CommonModule, IonicModule, SharedModule],
    declarations: [MessageComponent],
    entryComponents: [MessageComponent],
    exports: [MessageComponent],
    providers: []
})
export class MessageModule { }
