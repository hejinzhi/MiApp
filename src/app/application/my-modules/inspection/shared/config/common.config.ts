import { EnvConfig } from './../../../../../shared/config/env.config';

export class CommonConfig {

    // static getLinesUrl = EnvConfig.baseUrl + 'IPQA/GetLineConfig';
    static insertReportData = EnvConfig.baseUrl + 'IPQA/UploadReport';
    static getReportDate = EnvConfig.baseUrl + 'IPQA/GetReport';
    // static uploadPicture = EnvConfig.baseUrl + 'IPQA/UploadProblemPicture';
    static uploadPicture = EnvConfig.baseUrl + 'IPQA/UploadPicture';
    static getMriNameUrl = EnvConfig.baseUrl + 'IPQA/GetMRIName';
    static getMriLookupUrl = EnvConfig.baseUrl + 'IPQA/GetMRILookup';
    static uploadActionPicture = EnvConfig.baseUrl + 'IPQA/UploadActionPicture';
    static getPrivilegeUrl = EnvConfig.baseUrl + 'Guid/GetUserFunctions';

}