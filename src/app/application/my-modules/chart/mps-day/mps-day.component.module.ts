import { NgModule } from '@angular/core';
import { MpaDayComponent } from './mps-day.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TableComponentModule } from '../table/table.component.module';

@NgModule({
  declarations: [MpaDayComponent],
  imports: [TableComponentModule, IonicPageModule.forChild(MpaDayComponent), TranslateModule.forChild()],
  entryComponents: [
    MpaDayComponent
  ]
})
export class MpaDayComponentModule { }
