import { NgModule } from '@angular/core';
import { EquipSelectListComponent } from './equip-select-list.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [EquipSelectListComponent],
  imports: [IonicPageModule.forChild(EquipSelectListComponent),  TranslateModule.forChild()],
  entryComponents: [
    EquipSelectListComponent
  ]
})
export class InspMenuComponentModule { }
