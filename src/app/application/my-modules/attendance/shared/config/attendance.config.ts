import { EnvConfig } from '../../../../../shared/config/env.config';
import * as moment from 'moment';

export class AttendanceConfig {
  // 默认时间选择框的最大年份
  static SelectedMaxYear = +moment(new Date()).format('YYYY')+1;

  // 默认时间选择框的最大时间
  static SelectedMaxTime = moment(new Date()).format('YYYY-MM-DD');


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

  // 获得最大请假天数
  static getMaxDaysUrl = EnvConfig.baseUrl + 'OffDuty/GetOffDutyDays?type={type}';

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


  // 获取月出勤记录
  static getAttendanceMonthUrl = EnvConfig.baseUrl + 'Attendance/GetAttendanceMonth?';

  // 获取月出勤记录
  static getSwipeNoteUrl = EnvConfig.baseUrl + 'Attendance/GetTimeCardHistory?';

  // 获取出勤明细
  static getAttendanceDetailUrl = EnvConfig.baseUrl + 'Attendance/GetAttendanceDetail?';



  // 获取所有异常
  static getOffDutyExceptionUrl = EnvConfig.baseUrl + 'OffDuty/GetOffDutyException';

  // 处理异常
  static processOffDutyExceptionUrl = EnvConfig.baseUrl + 'OffDuty/ProcessOffDutyException';

  // 获得月或年请假天数
  static getOffDutyTotalDaysUrl = EnvConfig.baseUrl + 'OffDuty/GetOffDutyTotalDays?';

  // 获得月或年加班时数
  static getOverTimeTotalHoursUrl = EnvConfig.baseUrl + 'OverTime/GetOverTimeTotalHours?';

  // 获取某月内的请假明细
  static getOffDutyMonthHoursUrl = EnvConfig.baseUrl + 'OffDuty/GetOffDutyMonthHours?';

  // 获取某月内的加班明细
  static getOverTimeMonthHoursUrl = EnvConfig.baseUrl + 'OverTime/GetOverTimeMonthHours?';

  // 获取用户头像
  static getUserPhotoUrl = EnvConfig.baseUrl + 'Guid/GetUserPhoto?';

}
