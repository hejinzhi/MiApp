import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { BackButtonComponent } from './back-button.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  // imports: [IonicModule, TranslateModule.forChild()],
  declarations: [BackButtonComponent],
  imports: [IonicPageModule.forChild(BackButtonComponent), TranslateModule.forChild()],
  entryComponents: [
    BackButtonComponent
  ],
  exports: [BackButtonComponent],
  providers: []
})
export class BackButtonComponentModule { }
