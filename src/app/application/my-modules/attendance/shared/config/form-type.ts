export class FormType {
  attendance_wrong: {type:string,name:string} = {type:'0',name:'门禁异常待处理单'};

  attendance_lack: {type:string,name:string} = {type:'1',name:'未刷卡待处理单'};

  leave: {type:string,name:string} = {type:'2',name:'请假单'};

  over_time: {type:string,name:string} = {type:'3',name:'加班单'}

  business:{type:string,name:string} = {type:'4',name:'公出单'};

  callback_leave: {type:string,name:string} = {type:'5',name:'销假单'};

  swipe_note: {type:string,name:string} = {type:'6',name:'刷卡记录'};

  attendance_month: {type:string,name:string} = {type:'7',name:'出勤月档'};

  attendance_detail: {type:string,name:string} = {type:'8',name:'出勤状况明细'};

  sign_list: {type:string,name:string} = {type:'9',name:'签核名单'};

  type:{type:string,name:string}[] =[
    this.attendance_wrong,
    this.attendance_lack,
    this.leave,
    this.over_time,
    this.business,
    this.callback_leave,
    this.swipe_note,
    this.attendance_month,
    this.attendance_detail
  ]
}
