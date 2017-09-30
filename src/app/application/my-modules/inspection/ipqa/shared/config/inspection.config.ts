import { EnvConfig } from './../../../../../../shared/config/env.config';

// let baseUrl: string = 'http://10.86.13.20:3000/';

export class InspectionConfig {
    // static getNamesUrl = EnvConfig.baseUrl + 'name';

    static getLinesUrl = EnvConfig.baseUrl + 'IPQA/GetLineConfig';

    static getCategoryByLineUrl = EnvConfig.baseUrl + 'IPQA/GetCategoryByLine';

    static getStationByLineUrl = EnvConfig.baseUrl + 'IPQA/GetStationByLine';

    static getStationByCategoryUrl = EnvConfig.baseUrl + 'IPQA/GetStationByCategoryLine';

    static getCheckListByLineStationUrl = EnvConfig.baseUrl + 'IPQA/GetCheckListByLine';

    static getDutyKind = EnvConfig.baseUrl + 'OverTime/GetOverTimeDutyKind';

    static getEmp = EnvConfig.baseUrl + 'OffDuty/GetOffDutyAgent';

    static getExcReportDataUrl = EnvConfig.baseUrl + 'IPQA/GetExcReportData';

    // static assignOwnerUrl = EnvConfig.baseUrl + 'IPQA/AssignOwner';
    static assignOwnerUrl = EnvConfig.baseUrl + 'IPQA/UpdateReportLines';

    // static handleProblemUrl = EnvConfig.baseUrl + 'IPQA/HandleProblem';
    static handleProblemUrl = EnvConfig.baseUrl + 'IPQA/UpdateReportLines';

}