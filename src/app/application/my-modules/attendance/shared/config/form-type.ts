export class FormType {
  attendance_wrong: {type:string,name:string} = {type:'0',name:'门禁异常待处理单'};

  attendance_lack: {type:string,name:string} = {type:'1',name:'未刷卡待处理单'};

  leave: {type:string,name:string} = {type:'2',name:'请假单'};

  over_time: {type:string,name:string} = {type:'3',name:'加班单'}

  business:{type:string,name:string} = {type:'4',name:'公出单'};

  callback_leave: {type:string,name:string} = {type:'5',name:'销假单'};
}
