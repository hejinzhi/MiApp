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
    let sendData = this.editLeaveData(data);
    console.log(sendData)
    return this.myHttp.post(AttendanceConfig.saveLeaveUrl,sendData).then((res) => {
      return Promise.resolve(res.json())
    }).catch((err) => {
      this.errorDeal(err);
      return Promise.resolve([])
    });
  }
  editLeaveData(data: MyFormModel) {
    let sendData= {
      TYPE: '',
      STATUS: '',
      DOCNO: '',
      DETAIL: {
        ABSENT_CODE: '',
        START_TIME: '',
        END_TIME: '',
        AGENT: '',
        REASON: ''
      }
    };
    ({type: sendData.TYPE, status: sendData.STATUS, No: sendData.DOCNO} = data);
    ({reasonType: sendData.DETAIL.ABSENT_CODE,
      startTime: sendData.DETAIL.START_TIME,
      endTime: sendData.DETAIL.END_TIME,
      colleague: sendData.DETAIL.AGENT,
      reason: sendData.DETAIL.REASON } = data.data);
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
