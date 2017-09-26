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
    
}
