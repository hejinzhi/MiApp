import { PluginService } from './../../../../../../core/services/plugin.service';
import { MyHttpService } from './../../../../../../core/services/myHttp.service';
import { Injectable } from '@angular/core';
import { BossConfig } from '../config/boss.config';
import { EnvConfig } from '../../../../../../shared/config/env.config';

@Injectable()
export class BossService {

    constructor(
        private myHttp: MyHttpService,
        private plugin: PluginService
    ) { }


    getMriName() {
        return this.myHttp.get(BossConfig.getMriNameUrl + '?type=boss&company_name=' + EnvConfig.companyID);
    }

    get7SLocation() {
        return this.myHttp.get(BossConfig.getMriLookup + '?lookup_type=7S_LOCATION');
    }
}
