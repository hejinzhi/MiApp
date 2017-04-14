import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../shared/shared.module';
import { MeComponent } from './me.component';
import { SetComponent } from './set/set.component'

@NgModule({
    imports: [CommonModule, IonicModule, SharedModule],
    declarations: [MeComponent, SetComponent],
    exports: [MeComponent],
    entryComponents: [MeComponent, SetComponent],
    providers: []
})
export class MeModule { }
