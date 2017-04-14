import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';

import { ApplicationGridComponent } from './application-grid/application-grid.component';

@NgModule({
    imports: [CommonModule, IonicModule, FormsModule],
    declarations: [ApplicationGridComponent],
    exports: [ApplicationGridComponent],
    entryComponents: [],
    providers: []
})
export class SharedModule { }
