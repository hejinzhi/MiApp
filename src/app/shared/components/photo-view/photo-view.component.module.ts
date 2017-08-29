import { NgModule } from '@angular/core';
import { PhotoViewComponent } from './photo-view.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [PhotoViewComponent],
  imports: [IonicPageModule.forChild(PhotoViewComponent), TranslateModule.forChild()],
  entryComponents: [
    PhotoViewComponent
  ],
  providers: []
})
export class PhotoViewComponentModule { }
