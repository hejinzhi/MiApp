import { Injectable } from '@angular/core';
import { MyHttpService } from '../../../core/services/myHttp.service';
import { MeConfig } from '../config/me.config';
import { DatabaseService } from '../../../message/shared/service/database.service';

import { PluginService } from '../../../core/services/plugin.service';

@Injectable()
export class MeService {

    constructor(
        private myHttp: MyHttpService,
        private databaseService: DatabaseService,
        private plugin: PluginService
    ) { }

    setAvatar(avatarUrl: string) {
        // return this.myHttp.post(MeConfig.updateUserInfoUrl, { AVATAR_URL: avatarUrl });
        let user = JSON.parse(localStorage.getItem('currentUser'));
        return this.myHttp.post(MeConfig.updateAvatarUrl, { USER_NAME: user.username, PICTURE: avatarUrl });
    }

    setLocalAvatar(username: string, avatar: string) {
        return this.databaseService.updateAvatarByUsername(username, avatar);
    }

    changeMobile(mobile: string) {
        return this.myHttp.post(MeConfig.updateUserInfoUrl, { MOBILE: mobile });
    }

    changeTele(tele: string) {
        return this.myHttp.post(MeConfig.updateUserInfoUrl, { TELEPHONE: tele });
    }

    changeMail(mail: string) {
        return this.myHttp.post(MeConfig.updateUserInfoUrl, { EMAIL: mail });
    }

    getUserInfo(username: string, site: string) {
        return this.myHttp.get(MeConfig.getUserInfoUrl + '?emp_name=' + username + '&site=' + site);
    }
}
