import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { EquipItemComponent } from './equip-item.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [EquipItemComponent],
  imports: [IonicPageModule.forChild(EquipItemComponent), TranslateModule.forChild()],
  entryComponents: [
    EquipItemComponent
  ],
  exports: [EquipItemComponent],
  providers: []
})
export class EquipItemComponentModule { }