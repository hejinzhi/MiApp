import { NgModule } from '@angular/core';
import { ChineseConv } from './chinese-conv.pipe';
import { MyNumber } from './my-number.pipe';

@NgModule({
  declarations: [ ChineseConv, MyNumber ],
  exports: [ChineseConv, MyNumber ]
})
export class PipesModule { }
