import { Injectable } from '@angular/core';
import { MyHttpService } from '../../../../../core/services/myHttp.service';
import { MyFormModel } from '../models/my-form.model'
import { AttendanceConfig } from '../config/attendance.config'

import { PluginService }   from '../../../../../core/services/plugin.service';

@Injectable()
export class AttendanceService {

  constructor(
    private myHttp: MyHttpService,
    private plugin: PluginService
  ) { }

  // 请假单申请
  saveLeave(data: MyFormModel) {

    // return this.myHttp.post(AttendanceConfig.saveLeaveUrl,'').then((res) => {
    //   return Promise.resolve(res.json())
    // }).catch((err) => {
    //   this.errorDeal(err);
    //   return Promise.resolve([])
    // });
  }
  editLeaveData(data: MyFormModel) {
    let sendData: {
      TYPE: string,
      STATUS: string,
      DOCNO: string,
      DETAIL: {
        ABSENT_CODE: string,
        START_TIME: string,
        END_TIME: string,
        AGENT: string,
        REASON: string
      }
    }
    sendData.TYPE = data.type;
    sendData.STATUS = data.status;
    sendData.DOCNO = data.No;
    sendData.DETAIL.ABSENT_CODE = data.data.reasonType;
    sendData.DETAIL.START_TIME = data.data.startTime;
    sendData.DETAIL.END_TIME = data.data.endTime;
    sendData.DETAIL.AGENT = data.data.colleague;
    sendData.DETAIL.REASON = data.data.reason;
    return sendData;
  }
  // 获得签核名单
  getSignList(form_No: string) {
    return this.myHttp.get(AttendanceConfig.getSignListUrl + form_No).then((res) => {
      return Promise.resolve(res.json())
    }).catch((err) => {
      this.errorDeal(err);
      return Promise.resolve([])
    });
  }

  errorDeal(err: any) {
    switch (err.status) {
      case 404:
        this.plugin.showToast(err.statusText);
        break;
      case 0:
        this.plugin.showToast('连接服务器失败');
        break;
      default:
        this.plugin.showToast('出现未定义连接错误' + err.status);
        break;
    }
  }
}
