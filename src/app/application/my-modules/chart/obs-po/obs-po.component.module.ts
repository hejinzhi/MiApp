import { NgModule } from '@angular/core';
import { ObsPoComponent } from './obs-po.component';
import { TableComponentModule } from '../table/table.component.module';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../shared/directive/directives.module';

@NgModule({
  declarations: [ObsPoComponent ],
  imports: [TableComponentModule,IonicPageModule.forChild(ObsPoComponent), DirectivesModule, TranslateModule.forChild()],
  entryComponents: [
    ObsPoComponent
  ]
})
export class ObsPoComponentModule { }
