import { NgModule } from '@angular/core';
import { SignListComponent } from './sign-list.component';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../shared/pipe/pipes.module';
import { DirectivesModule } from '../shared/directive/directives.module'

@NgModule({
  declarations: [SignListComponent],
  imports: [IonicPageModule.forChild(SignListComponent), PipesModule, DirectivesModule],
  entryComponents: [
    SignListComponent
  ]
})
export class SignListComponentModule { }
