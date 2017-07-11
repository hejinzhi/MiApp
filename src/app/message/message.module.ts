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
import { Camera } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Geolocation } from '@ionic-native/geolocation';
import { TimeDescPipe } from './shared/pipe/timedesc.pipe';
import { ChangeSpace } from './shared/pipe/changespace.pipe';
import { PipesModule } from '../shared/pipe/pipes.module';
import { DatabaseService } from './shared/service/database.service';
import { Keyboard } from '@ionic-native/keyboard';
import { KeyboardAttachDirective } from './shared/directive/KeyboardAttachDirective';
import { MyBMapDirective } from './shared/directive/BmapDirective';
import { DrawChartDirective } from './shared/directive/DrawChartDirective';
import { ImageViewerController } from 'ionic-img-viewer';


@NgModule({
  imports: [CommonModule, IonicModule, SharedModule, PipesModule],
  declarations: [MessageComponent, DialogueComponent, NoticeComponent, TimeDescPipe, AlertComponent, ChangeSpace, KeyboardAttachDirective, MyBMapDirective, ChartComponent, DrawChartDirective],
  entryComponents: [MessageComponent, DialogueComponent, NoticeComponent, AlertComponent, ChartComponent],
  exports: [MessageComponent, DialogueComponent, NoticeComponent, AlertComponent, ChartComponent],
  providers: [MessageService, Keyboard, Camera, DatabaseService, PhotoViewer, Geolocation, ImageViewerController]
})
export class MessageModule { }
