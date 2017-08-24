import { NgModule } from '@angular/core';
import { SwipeNoteComponent } from './swipe-note.component';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../shared/pipe/pipes.module';

@NgModule({
  declarations: [SwipeNoteComponent],
  imports: [IonicPageModule.forChild(SwipeNoteComponent), PipesModule],
  entryComponents: [
    SwipeNoteComponent
  ]
})
export class SwipeNoteComponentModule { }
