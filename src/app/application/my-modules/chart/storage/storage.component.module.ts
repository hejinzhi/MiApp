import { NgModule } from '@angular/core';
import { StorageComponent } from './storage.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [StorageComponent],
  imports: [IonicPageModule.forChild(StorageComponent), TranslateModule.forChild()],
  entryComponents: [
    StorageComponent
  ]
})
export class StorageComponentModule { }
