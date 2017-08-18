import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { RewardService } from './reward.service'

// import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [CommonModule, IonicModule],
    providers: [RewardService]
})
export class RewardModule { }
