import { EnvConfig } from '../../../../../shared/config/env.config';

export class AttendanceConfig {

    // 根据模块获取function清单
    static getSignListUrl = EnvConfig.baseUrl + 'Att/GetApproveList?docNum=';

    // 根据模块获取function清单
    static saveLeaveUrl = EnvConfig.baseUrl + 'OffDuty/AddOffDuty';

}
