import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PhotoViewComponent } from './photo-view.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [IonicModule, TranslateModule.forChild()],
  declarations: [PhotoViewComponent],
  exports: [PhotoViewComponent]
})
export class PhotoViewComponentModule { }
