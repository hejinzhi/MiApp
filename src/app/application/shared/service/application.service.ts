import { Injectable } from '@angular/core';

import { MyHttpService } from '../../../core/services/myHttp.service';
import { ApplicationConfig } from '../config/application.config';


@Injectable()
export class ApplicationService {

    constructor(private myHttp: MyHttpService) { }

    public moveAppToMorePage(moduleID) {
        return this.myHttp.post(ApplicationConfig.updateModuleDisplayUrl + `?moduleID=${moduleID}&display=N`, {});
    }

    public moveItemToAppPage(moduleID) {
        return this.myHttp.post(ApplicationConfig.updateModuleDisplayUrl + `?moduleID=${moduleID}&display=Y`, {});
    }
}