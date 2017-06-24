import { NgModule } from '@angular/core';
import { ChineseConv } from './chinese-conv.pipe';


@NgModule({
  declarations: [ ChineseConv ],
  exports: [ChineseConv ]
})
export class PipesModule { }
