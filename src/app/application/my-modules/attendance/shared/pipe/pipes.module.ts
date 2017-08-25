import { NgModule } from '@angular/core';
import { ReasonTypePipe } from './reason-type.pipe';
import { OtherTypePipe } from './other-type.pipe';
import { FormTypePipe } from './form-type.pipe';
import { WeekNamePipe } from './week-name.pipe';
import { DuringPipe } from './during.pipe';
import { LengthPipe } from './length.pipe';
import { MydatePipe } from './mydate.pipe';
import {  PipesModule as SharePipesModule } from '../../../../../shared/pipe/pipes.module';

@NgModule({
  imports: [SharePipesModule],
  declarations: [ReasonTypePipe, OtherTypePipe, FormTypePipe, WeekNamePipe, DuringPipe, LengthPipe, MydatePipe],
  exports: [ReasonTypePipe, OtherTypePipe, FormTypePipe, WeekNamePipe, DuringPipe, LengthPipe, MydatePipe, SharePipesModule]
})
export class PipesModule { }
