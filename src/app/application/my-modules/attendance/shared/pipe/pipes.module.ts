import { NgModule } from '@angular/core';
import { ReasonTypePipe } from './reason-type.pipe';
import { OtherTypePipe } from './other-type.pipe';
import { FormTypePipe } from './form-type.pipe';
import { WeekNamePipe } from './week-name.pipe';
import { DuringPipe } from './during.pipe';
import { LengthPipe } from './length.pipe';
import { ChineseConv } from './chinese-conv.pipe';
import { MydatePipe } from './mydate.pipe';

@NgModule({
  declarations: [ReasonTypePipe, OtherTypePipe, FormTypePipe, WeekNamePipe, DuringPipe, LengthPipe, ChineseConv, MydatePipe],
  exports: [ReasonTypePipe, OtherTypePipe, FormTypePipe, WeekNamePipe, DuringPipe, LengthPipe, ChineseConv, MydatePipe]
})
export class PipesModule { }
