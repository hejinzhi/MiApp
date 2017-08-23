import { EnvConfig } from '../../../../../shared/config/env.config';

export class OthersConfig {

    // 獲取獎懲單信息
    static getRewardListUrl = EnvConfig.baseUrl + 'ReportErp/GetAwardInfo';

    static getWorkOffdutyListUrl= EnvConfig.baseUrl + 'OffDuty/GetWrokOffDuty';
}