import { NgModule } from '@angular/core';
import { PhotoDirective } from './photo.directive';


@NgModule({
  declarations: [ PhotoDirective ],
  exports: [ PhotoDirective ]
})
export class DirectivesModule { }
