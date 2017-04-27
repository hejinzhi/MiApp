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
  // 根据日期获取请假单
  getLeaveForm(formData:any) {
    let dateFM ='';
    let dateTO ='';
    return this.myHttp.get(AttendanceConfig.getLeaveFormUrl+`dateFM=${dateFM}&dateTO=${dateTO}`).then((res) => {
      let formData = res.json();
      formData = formData.map((item:any) => {
        return this.editLeaveData_get(item)
      })
      this.editLeaveData_get(res.json()[0])
      return Promise.resolve(formData)
    }).catch((err) => {
      console.log(err)
      this.errorDeal(err);
      return Promise.resolve([])
    });
  }

  // 请假单申请
  saveLeaveForm(data: MyFormModel) {
    let sendData = this.editLeaveData_send(data);
    console.log(sendData)
    return this.myHttp.post(AttendanceConfig.saveLeaveUrl,sendData).then((res) => {
      return Promise.resolve(res.json())
    }).catch((err) => {
      console.log(err)
      this.errorDeal(err);
      return Promise.resolve([])
    });
  }
  editLeaveData_get(data: any) {
    let newData = {
      type: '2',
      status: '',
      No: '',
      data: {
        reasonType: '',
        startTime: '',
        endTime: '',
        colleague: '',
        reason: '',
        days: '',
        hours: '',
      }
    };
    ({STATUS:newData.status,
      DOCNO:newData.No,
      ABSENT_CODE:newData.data.reasonType,
      REASON: newData.data.reason,
      AGENT: newData.data.colleague,
      DAYS: newData.data.days,
      HOURS: newData.data.hours
    }=data);
    newData.data.startTime = new Date(Date.parse(data.DATE_FM) + data.TIME_HH_FM*60*60*1000 + data.TIME_MM_FM*60*1000 - 8*60*60*1000).toISOString();
    newData.data.endTime = new Date(Date.parse(data.DATE_TO) + data.TIME_HH_TO*60*60*1000 + data.TIME_MM_TO*60*1000 - 8*60*60*1000).toISOString();
    return newData;
  }
  editLeaveData_send(data: MyFormModel) {
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
    sendData.DOCNO ='';
    sendData.DETAIL.END_TIME = this.formatTime(sendData.DETAIL.END_TIME,true);
    sendData.DETAIL.START_TIME = this.formatTime(sendData.DETAIL.START_TIME,true);
    console.log(new Date(sendData.DETAIL.END_TIME).toLocaleString())
    console.log(new Date(sendData.DETAIL.START_TIME).toLocaleString())
    return sendData;
  }
  formatTime(time:string,send:boolean) {
    let newTime:string = '';
    if(send) {
      newTime = new Date(Date.parse(time)-60*60*8*1000).toISOString();
    } else {
      newTime = new Date(Date.parse(time)+60*60*8*1000).toISOString();
    }
    return newTime;
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
