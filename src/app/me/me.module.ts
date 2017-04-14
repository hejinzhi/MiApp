import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../shared/shared.module';
import { MeComponent } from './me.component';

@NgModule({
    imports: [CommonModule, IonicModule, SharedModule],
    declarations: [MeComponent],
    exports: [MeComponent],
    entryComponents: [MeComponent],
    providers: []
})
export class MeModule { }
