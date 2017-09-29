import { EnvConfig } from '../../../../../../shared/config/env.config';

export class BossConfig {

    static getMriNameUrl = EnvConfig.baseUrl + 'IPQA/GetMRIName';
    
    static getMriLookup = EnvConfig.baseUrl + 'IPQA/GetMRILookup';

    static getMriWeek = EnvConfig.baseUrl + 'IPQA/GetMRIWeek';

    static saveSchedule = EnvConfig.baseUrl + 'IPQA/UploadSchedule';

    /**
     * URL
     * 更新或添加报告
     * POST<BossReport>
     * 2017-09-25
     */
    static uploadReport = EnvConfig.baseUrl + 'IPQA/UploadReport';

    /**
     * URL
     * 获得巡检安排
     * GET
     * 2017-09-27
     * @param {string} {company}
     */
    static getEmployeeSchedule = EnvConfig.baseUrl + 'IPQA/GetEmployeeSchedule?company={company}';

    /**
     * URL
     * 获得报告详情
     * GET
     * 2017-09-27
     * @param {string} {header_id}
     */
    static getBossReport = EnvConfig.baseUrl + 'IPQA/GetReport?header_id={header_id}';

    /**
     * URL
     * 根据条件查找报告
     * GET
     * 2017-09-28
     * @param {string} {problemStatus} [New,Waiting,Done,Close,Highlight]
     * @param {string} {empno} 负责人名字
     * @param {string} {type} 类别 'boss'主管巡查；'IPQA'；'equip'設備
     * @param {string} {company_name} 所属公司
     */
    static getExcReportData = EnvConfig.baseUrl + 'IPQA/GetExcReportData?problemStatus={problemStatus}&empno={empno}&type={type}&company_name={company_name}'
    
}
