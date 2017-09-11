export class FormType {
  
  attendance_wrong: {type:string,name:string} = {type:'0',name:'attendance.attendance_wrong'};

  attendance_lack: {type:string,name:string} = {type:'1',name:'attendance.attendance_lack'};

  leave: {type:string,name:string} = {type:'2',name:'attendance.leave'};

  over_time: {type:string,name:string} = {type:'3',name:'attendance.over_time'}

  business:{type:string,name:string} = {type:'4',name:'attendance.business'};

  callback_leave: {type:string,name:string} = {type:'5',name:'attendance.callback_leave'};

  swipe_note: {type:string,name:string} = {type:'6',name:'attendance.swipe_note'};

  attendance_month: {type:string,name:string} = {type:'7',name:'attendance.attendance_month'};

  attendance_detail: {type:string,name:string} = {type:'8',name:'attendance.attendance_detail'};

  sign_list: {type:string,name:string} = {type:'9',name:'attendance.sign_list'};

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
