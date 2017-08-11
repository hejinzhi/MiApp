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


}
