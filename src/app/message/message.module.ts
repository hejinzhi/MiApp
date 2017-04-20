import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../shared/shared.module';
import { MessageComponent } from './message.component';
import { MessageService } from './shared/service/message.service'
import { DialogueComponent } from './dialogue/dialogue.component';
import { Keyboard } from '@ionic-native/keyboard';
import { Camera } from '@ionic-native/camera';

@NgModule({
    imports: [CommonModule, IonicModule, SharedModule],
    declarations: [MessageComponent,DialogueComponent],
    entryComponents: [MessageComponent,DialogueComponent],
    exports: [MessageComponent,DialogueComponent],
    providers: [MessageService,Keyboard,Camera]
})
export class MessageModule { }
