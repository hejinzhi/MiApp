import { EnvConfig } from '../../shared/config/env.config.ts';

export class ContactConfig {

    // 获取同部门人员信息
    static getSameDeptPersonUrl = EnvConfig.baseUrl + 'Guid/GetDeptUserView';

    // 根据公司获取部门信息
    static getDeptInfoUrl = EnvConfig.baseUrl + 'Guid/GetDeptNameBySite';

    // 根据部门获取员工信息
    static getPersonByDeptUrl = EnvConfig.baseUrl + 'Guid/GetUserViewByDept';

    // 获取下属信息
    static getSubordinateUrl = EnvConfig.baseUrl + 'Guid/GetUnderUserView';
}
