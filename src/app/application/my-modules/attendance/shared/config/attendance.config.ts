import { EnvConfig } from '../../../../../shared/config/env.config';

export class AttendanceConfig {
  // 默认时间选择框的最大年份
  static SelectedMaxYear = +new Date().getFullYear()+1+'';

  // 获得签核名单
  static getSignListUrl = EnvConfig.baseUrl + 'Attendance/GetApproveList?docNum=';

  // 保存表单
  static saveLeaveUrl = EnvConfig.baseUrl + 'OffDuty/AddOffDuty';

  // 根据日期获取请假单
  static getLeaveFormByDateUrl = EnvConfig.baseUrl + 'OffDuty/GetOffDutyByDate?';

  // 根据单据号获取请假单
  static getLeaveFormByNoUrl = EnvConfig.baseUrl + 'OffDuty/GetOffDutyByDOCNO?';

  // 获得请假类型信息
  static getLeaveReasonTypeUrl = EnvConfig.baseUrl + 'OffDuty/GetOffDutyType';

  // 获得默认上班时间及更新请假时长
  static getLeaveDuringUrl = EnvConfig.baseUrl + 'OffDuty/CheckOffDuty';

  // 获得最近工作日，范围包括今天
  static getWorkDayUrl = EnvConfig.baseUrl + 'OffDuty/GetWorkDay';

  // 获得所有假期信息
  static getLeaveDaysUrl = EnvConfig.baseUrl + 'OffDuty/GetOffDutyDays';

  // 删除请假单
  static deleteLeaveFormUrl = EnvConfig.baseUrl + 'OffDuty/DeleteOffDuty';

  // 获得代理人
  static getAgentUrl = EnvConfig.baseUrl + 'OffDuty/GetOffDutyAgent?';

  // 送签
  static sendSignUrl = EnvConfig.baseUrl + 'Attendance/SendSign';

  // 取消送签
  static callBackSignUrl = EnvConfig.baseUrl + 'Attendance/CancelSign';



  // 加班单申请
  static saveOverTimeUrl = EnvConfig.baseUrl + 'OverTime/AddOverTime';

  // 删除加班单
  static deleteOverTimeFormUrl = EnvConfig.baseUrl + 'OverTime/DeleteOverTime';

  // 根据日期获取加班单
  static getOverTimeFormByDateUrl = EnvConfig.baseUrl + 'OverTime/GetOverTimeByDate?';

  // 根据单据号获取加班单
  static getOverTimeFormByNoUrl = EnvConfig.baseUrl + 'OverTime/GetOverTImeByDOCNO?';

  // 获得班别与加班时长
  static getOverTimeDetailUrl = EnvConfig.baseUrl + 'OverTime/GetOverTimeDutyKind';


  // 获取可销假的请假单
  static getCanCallbackLeaveFromUrl = EnvConfig.baseUrl + 'DelOffDuty/GetCanDelOffDuty';

  // 申请销假单
  static saveCallbackLeaveFromUrl = EnvConfig.baseUrl + 'DelOffDuty/AddOffDuty';

  // 删除销假单
  static deleteCallbackLeaveFromUrl = EnvConfig.baseUrl + 'DelOffDuty/DeleteDelOffDuty';

  // 获取销假单
  static getCallbackLeaveFromUrl = EnvConfig.baseUrl + 'DelOffDuty/GetDelOffDuty?';

}
