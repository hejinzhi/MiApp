import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../shared/shared.module';
import { MessageComponent } from './message.component';
import { MessageService } from './shared/service/message.service'
import { DialogueComponent } from './dialogue/dialogue.component';
import { NoticeComponent } from './notice/notice.component';
import { ChartComponent } from './chart/chart.component';
import { AlertComponent } from './alert/alert.component';
import { TableComponent } from './table/table.component';
import { EmojiComponent } from './emoji/emoji.component';
import { MapComponent } from './map/map.component';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { TimeDescPipe } from './shared/pipe/timedesc.pipe';
import { ChangeSpace } from './shared/pipe/changespace.pipe';
import { PipesModule } from '../shared/pipe/pipes.module';
import { DatabaseService } from './shared/service/database.service';
import { Keyboard } from '@ionic-native/keyboard';
import { KeyboardAttachDirective } from './shared/directive/KeyboardAttachDirective';
import { MyBMapDirective } from './shared/directive/BmapDirective';
import { DrawChartDirective } from './shared/directive/DrawChartDirective';
import { Ng2EmojiPipe } from './shared/pipe/emojis.pipe';
import { Ng2EmojiService } from './shared/service/emojis.service';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Media } from '@ionic-native/media';

@NgModule({
  imports: [CommonModule, IonicModule, SharedModule, PipesModule, IonicImageViewerModule],
  declarations: [MessageComponent, DialogueComponent, NoticeComponent, TimeDescPipe, AlertComponent, ChangeSpace, KeyboardAttachDirective, MyBMapDirective, ChartComponent, DrawChartDirective, TableComponent, Ng2EmojiPipe, EmojiComponent, MapComponent],
  entryComponents: [MessageComponent, DialogueComponent, NoticeComponent, AlertComponent, ChartComponent, MapComponent],
  exports: [MessageComponent, DialogueComponent, NoticeComponent, AlertComponent, ChartComponent, MapComponent],
  providers: [MessageService, Keyboard, Camera, DatabaseService, Geolocation, Ng2EmojiService, Media]
})
export class MessageModule { }
