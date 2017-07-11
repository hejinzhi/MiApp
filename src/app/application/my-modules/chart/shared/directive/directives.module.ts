import { NgModule } from '@angular/core';
import { MyBMapDirective } from './Bmap.directive';


@NgModule({
  declarations: [ MyBMapDirective ],
  exports: [MyBMapDirective ]
})
export class DirectivesModule { }
