import { NgModule } from '@angular/core';
import { StorageComponent } from './storage.component';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [StorageComponent],
  imports: [IonicPageModule.forChild(StorageComponent)],
  entryComponents: [
    StorageComponent
  ]
})
export class StorageComponentModule { }
