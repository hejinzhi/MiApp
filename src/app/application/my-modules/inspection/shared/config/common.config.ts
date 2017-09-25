import { EnvConfig } from './../../../../../shared/config/env.config';

export class CommonConfig {

    // static getLinesUrl = EnvConfig.baseUrl + 'IPQA/GetLineConfig';
    static insertReportData = EnvConfig.baseUrl + 'IPQA/UploadReport';

    static getMriNameUrl = EnvConfig.baseUrl + 'IPQA/GetMRIName';

}