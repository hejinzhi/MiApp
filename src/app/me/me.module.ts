import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../shared/shared.module';
import { MeComponent } from './me.component';
import { SetComponent } from './set/set.component';
import { MeDetailComponent } from './me-detail/me-detail.component';

@NgModule({
    imports: [CommonModule, IonicModule, SharedModule],
    declarations: [MeComponent, SetComponent, MeDetailComponent],
    exports: [MeComponent],
    entryComponents: [MeComponent, SetComponent, MeDetailComponent],
    providers: []
})
export class MeModule { }
