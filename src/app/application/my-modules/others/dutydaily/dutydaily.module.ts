import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { DutyDailyService } from './dutydaily.service'

// import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [CommonModule, IonicModule],
    providers: [DutyDailyService]
})
export class DutyDailyModule { }
