import { EnvConfig } from '../../../../../../shared/config/env.config';

export class BossConfig {

    static getMriNameUrl = EnvConfig.baseUrl + 'IPQA/GetMRIName';
    
    static getMriLookup = EnvConfig.baseUrl + 'IPQA/GetMRILookup';

    static getMriWeek = EnvConfig.baseUrl + 'IPQA/GetMRIWeek';

    static saveSchedule = EnvConfig.baseUrl + 'IPQA/UploadSchedule';

    /**
     * URL
     * POST<BossReport>
     * 2017-09-25
     */
    static uploadReport = EnvConfig.baseUrl + 'IPQA/UploadReport';

    /**
     * URL
     * GET
     * @param {string} {company}
     */
    static getEmployeeSchedule = EnvConfig.baseUrl + 'IPQA/GetEmployeeSchedule?company={company}';

    /**
     * URL
     * GET
     * @param {string} {header_id}
     */
    static getBossReport = EnvConfig.baseUrl + 'IPQA/GetReport?header_id={header_id}';
    
}
