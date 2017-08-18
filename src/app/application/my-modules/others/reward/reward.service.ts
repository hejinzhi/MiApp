import { Injectable } from '@angular/core';
import { MyHttpService } from '../../../../core/services/myHttp.service';
import { PluginService } from '../../../../core/services/plugin.service';

import { OthersConfig } from '../shared/config/others.config';

@Injectable()
export class RewardService {
    constructor(private myHttp: MyHttpService, private plugin: PluginService) {
    }

    getRewardList(empno: string) {
        return this.myHttp.get(OthersConfig.getRewardListUrl + '?empno=' + empno);
    }
}