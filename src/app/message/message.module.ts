import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../shared/shared.module';
import { MessageComponent } from './message.component';
import { MessageService } from './shared/service/message.service'
import { DialogueComponent } from './dialogue/dialogue.component';
import { NoticeComponent } from './notice/notice.component';
import { AlertComponent } from './alert/alert.component';
import { Keyboard } from '@ionic-native/keyboard';
import { Camera } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { TimeDescPipe } from './shared/pipe/timedesc.pipe';
import { ChangeSpace } from './shared/pipe/changespace.pipe';
import { PipesModule } from '../shared/pipe/pipes.module';
import { DatabaseService } from './shared/service/database.service';


@NgModule({
  imports: [CommonModule, IonicModule, SharedModule, PipesModule],
  declarations: [MessageComponent, DialogueComponent, NoticeComponent, TimeDescPipe, AlertComponent, ChangeSpace],
  entryComponents: [MessageComponent, DialogueComponent, NoticeComponent, AlertComponent],
  exports: [MessageComponent, DialogueComponent, NoticeComponent, AlertComponent],
  providers: [MessageService, Keyboard, Camera, DatabaseService, PhotoViewer]
})
export class MessageModule { }
