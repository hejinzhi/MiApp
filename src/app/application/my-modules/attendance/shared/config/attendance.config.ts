import { EnvConfig } from '../../../../../shared/config/env.config';

export class AttendanceConfig {
  // 默认时间选择框的最大年份
  static SelectedMaxYear = +new Date().getFullYear()+1+'';

  // 获得签核名单
  static getSignListUrl = EnvConfig.baseUrl + 'Att/GetApproveList?docNum=';

  // 保存表单
  static saveLeaveUrl = EnvConfig.baseUrl + 'OffDuty/AddOffDuty';

  // 根据日期获取请假单
  static getLeaveFormByDateUrl = EnvConfig.baseUrl + 'OffDuty/GetOffDutyByDate?';

  // 根据单据号获取请假单
  static getLeaveFormByNoUrl = EnvConfig.baseUrl + 'OffDuty/GetOffDutyByDOCNO?';

  // 获得请假类型信息
  static getLeaveReasonTypeUrl = EnvConfig.baseUrl + 'OffDuty/GetOffDutyType';

  // 获得所有假期信息
  static getLeaveDaysUrl = EnvConfig.baseUrl + 'OffDuty/GetOffDutyDays';

  // 删除请假单
  static deleteLeaveFormUrl = EnvConfig.baseUrl + 'OffDuty/DeleteOffDuty';

  // 获得代理人
  static getAgentUrl = EnvConfig.baseUrl + 'OffDuty/GetOffDutyAgent?';

  // 送签
  static sendSignUrl = EnvConfig.baseUrl + 'Att/SendSign';

  // 取消送签
  static callBackSignUrl = EnvConfig.baseUrl + 'Att/CancelSign';



  // 加班单申请
  static saveOverTimeUrl = EnvConfig.baseUrl + 'OverTime/AddOverTime';

  // 删除加班单
  static deleteOverTimeFormUrl = EnvConfig.baseUrl + 'OverTime/DeleteOverTime';

  // 根据日期获取加班单
  static getOverTimeFormByDateUrl = EnvConfig.baseUrl + 'OverTime/GetOverTimeByDate?';

  // 根据单据号获取加班单
  static getOverTimeFormByNoUrl = EnvConfig.baseUrl + 'OverTime/GetOverTImeByDOCNO?';

}
