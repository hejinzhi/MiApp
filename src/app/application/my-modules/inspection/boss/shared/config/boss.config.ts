import { EnvConfig } from './../../../../../../shared/config/env.config';

export class BossConfig {

    static getMriNameUrl = EnvConfig.baseUrl + 'IPQA/GetMRIName';
    
    static getMriLookup = EnvConfig.baseUrl + 'IPQA/GetMRILookup';

    static getMriWeek = EnvConfig.baseUrl + 'IPQA/GetMRIWeek';

    static saveSchedule = EnvConfig.baseUrl + 'IPQA/UploadSchedule';

    static getScheduleInfoUrl = EnvConfig.baseUrl + 'IPQA/GetScheduleInfo';

    static getScheduleListUrl = EnvConfig.baseUrl + 'IPQA/GetScheduleList';  

    static deleteScheduleLinesUrl = EnvConfig.baseUrl + 'IPQA/DeleteScheduleLines';  

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

    
    /**
     * URL
     * 更新Lines表的数据
     * post
     * 2017-09-30
     * @static
     */
    static updateReportLines = EnvConfig.baseUrl + 'IPQA/UpdateReportLines'

    /**
     * URL
     * 上传图片，获得返回的url
     * post { "PICTURE":"Base64 String..." }
     * 2017-09-30
     * @static
     */
    static uploadPicture =  EnvConfig.baseUrl + 'IPQA/UploadPicture';
    
    /**
     * URL
     * 根据条件查找所有的问题项
     * get
     * 2017-10-09
     * @param {string} {type} 巡检类别
     * @param {string} {nameID} 巡检类别里的细分的id
     * @param {string} {dateFM} 开始时间
     * @param {string} {dateTO} 结束时间
     * @param {string} {company_name} 所属公司
     * 
     * @static
     */
    static getAdminLinesAll = EnvConfig.baseUrl + 'IPQA/GetProblemTrack?nameID={nameID}&dateFM={dateFM}&dateTO={dateTO}&company_name={company_name}&type={type}';
    
}
