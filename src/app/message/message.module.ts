import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../shared/shared.module';
import { MessageComponent } from './message.component';
import { MessageService } from './shared/service/message.service'
import { DialogueComponent } from './dialogue/dialogue.component';
import { NoticeComponent } from './notice/notice.component';
import { AlertComponent } from './alert/alert.component';
import { Camera } from '@ionic-native/camera';
import { TimeDescPipe } from './shared/pipe/timedesc.pipe';
import { ChangeSpace } from './shared/pipe/changespace.pipe';
import { PipesModule } from '../shared/pipe/pipes.module';
import { DatabaseService } from './shared/service/database.service';
import { Keyboard } from '@ionic-native/keyboard';
import { KeyboardAttachDirective } from './shared/directive/KeyboardAttachDirective';


@NgModule({
  imports: [CommonModule, IonicModule, SharedModule, PipesModule],
  declarations: [MessageComponent, DialogueComponent, NoticeComponent, TimeDescPipe, AlertComponent, ChangeSpace, KeyboardAttachDirective],
  entryComponents: [MessageComponent, DialogueComponent, NoticeComponent, AlertComponent],
  exports: [MessageComponent, DialogueComponent, NoticeComponent, AlertComponent],
  providers: [MessageService, Camera, DatabaseService, Keyboard]
})
export class MessageModule { }
