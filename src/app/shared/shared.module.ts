import { PhotoViewComponentModule } from './components/photo-view/photo-view.component.module';
import { PipesModule } from './../application/my-modules/attendance/shared/pipe/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [CommonModule, IonicModule, FormsModule],
    declarations: [],
    exports: [CommonModule, IonicModule, FormsModule, PipesModule, PhotoViewComponentModule],
    entryComponents: [],
    providers: []
})
export class SharedModule { }
