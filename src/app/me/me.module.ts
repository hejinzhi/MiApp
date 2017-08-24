import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { MeService } from './shared/service/me.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    imports: [CommonModule, IonicModule, SharedModule,TranslateModule.forChild()],
    providers: [MeService]
})
export class MeModule { }
