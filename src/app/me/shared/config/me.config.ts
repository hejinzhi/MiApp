import { EnvConfig } from '../../../shared/config/env.config';

export class MeConfig {

    static updateUserInfoUrl = EnvConfig.baseUrl + 'Guid/UpdateUserInfo';
    
    static getUserInfoUrl = EnvConfig.baseUrl + 'Guid/GetUserLike';
}
