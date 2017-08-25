import { NgModule } from '@angular/core';
import { MyNumber } from './my-number.pipe';
import {  PipesModule as SharePipesModule } from '../../../../../shared/pipe/pipes.module';

@NgModule({
  imports: [SharePipesModule],
  declarations: [ MyNumber ],
  exports: [ MyNumber, SharePipesModule]
})
export class PipesModule { }
