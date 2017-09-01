import { Injectable } from '@angular/core';
import { MyHttpService } from '../../../../core/services/myHttp.service';
import { PluginService } from '../../../../core/services/plugin.service';

import { OthersConfig } from '../shared/config/others.config';

@Injectable()
export class DutyDailyService {
    constructor(private myHttp: MyHttpService, private plugin: PluginService) {
    }

    getWorkOffdutyList(centerflag: string, deptno: string, offdutyflag: string, reportdate: string) {
        return this.myHttp.get(OthersConfig.getWorkOffdutyListUrl + '?centerflag=' + centerflag + '&deptno=' + deptno + '&offdutyflag=' + offdutyflag + '&reportdate=' + reportdate);
    }
}