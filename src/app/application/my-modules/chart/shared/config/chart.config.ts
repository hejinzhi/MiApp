import { EnvConfig } from '../../../../../shared/config/env.config';

export class ChartConfig {

  /**
   * 获得年资分析的信息
   * url
   * get
   */
  static getSalaryChartInfo = EnvConfig.baseUrl + 'ReportErp/GetSeniorityTotal';

  /**
   * 获得离职率分析的信息
   * url
   * get
   * type:['T','DL','IDL','SA']
   */
  static getDimissionChartInfo = EnvConfig.baseUrl + 'ReportErp/GetLeaveRateDetail?type={type}';

  /**
   * 获得MPS達成率(日报)的信息
   * url
   * get
   */
  static getMpsDayChartInfo = EnvConfig.baseUrl + 'ReportErp/GetMpsRateInfo';

  /**
   * 获得MPS達成率(月报)的信息
   * url
   * get
   * type: [MSL, MD1, MD2, MD3]
   */
  static getMpsMonthChartInfo = EnvConfig.baseUrl + 'ReportErp/GetMpsRateDetail?type={type}';

  /**
   * 获得出货達成率(日报)的信息
   * url
   * get
   */
  static getSaleDayChartInfo = EnvConfig.baseUrl + 'ReportErp/GetShipRateDaily';

  /**
   * 获得出货達成率(月报)的信息
   * url
   * get
   * type: [TBU CBU EBU MBU MSL_CM MSL]
   */
  static getSaleMonthChartInfo = EnvConfig.baseUrl + 'ReportErp/GetShipRateMonth?type={type}';

  /**
   *  获得PL庫周轉天數(日報)的信息
   *  url
   *  get
   *  dateStr:YYYYMMDD
   *  deptID: [82,81,101,141,161,162,1,181,102]
   */
  static getPlFlowChartInfo = EnvConfig.baseUrl + 'ReportErp/GetPLRate?dateStr={dateStr}&deptID={deptID}';
}
