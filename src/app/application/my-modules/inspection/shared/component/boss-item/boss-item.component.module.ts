import { PipesModule } from './../../../../../../shared/pipe/pipes.module';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { BossItemComponent } from './boss-item.component';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [BossItemComponent],
  imports: [IonicPageModule.forChild(BossItemComponent), TranslateModule.forChild(), PipesModule],
  entryComponents: [
    BossItemComponent
  ],
  exports: [BossItemComponent],
  providers: []
})
export class BossItemComponentModule { }
