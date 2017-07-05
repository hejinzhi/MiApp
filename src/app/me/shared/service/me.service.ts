import { Injectable } from '@angular/core';
import { MyHttpService } from '../../../core/services/myHttp.service';
import { MeConfig } from '../config/me.config';
import { DatabaseService } from '../../../message/shared/service/database.service';

@Injectable()
export class MeService {

    constructor(
        private myHttp: MyHttpService,
        private databaseService: DatabaseService
    ) { }

    setAvatar(id: number, avatarUrl: string) {
        return this.myHttp.post(MeConfig.setAvatarUrl, { ID: id, AVATAR_URL: avatarUrl });
    }

    setLocalAvatar(username: string, avatar: string) {
        return this.databaseService.updateAvatarByUsername(username, avatar);
    }
}