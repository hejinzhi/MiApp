import { LanguageTypeConfig } from './language-type.config';
export class FormType {

  fontType:string = localStorage.getItem('languageType')
  fontContent = LanguageTypeConfig.formType[this.fontType];

  attendance_wrong: {type:string,name:string} = {type:'0',name:this.fontContent.attendance_wrong};

  attendance_lack: {type:string,name:string} = {type:'1',name:this.fontContent.attendance_lack};

  leave: {type:string,name:string} = {type:'2',name:this.fontContent.leave};

  over_time: {type:string,name:string} = {type:'3',name:this.fontContent.over_time}

  business:{type:string,name:string} = {type:'4',name:this.fontContent.business};

  callback_leave: {type:string,name:string} = {type:'5',name:this.fontContent.callback_leave};

  swipe_note: {type:string,name:string} = {type:'6',name:this.fontContent.swipe_note};

  attendance_month: {type:string,name:string} = {type:'7',name:this.fontContent.attendance_month};

  attendance_detail: {type:string,name:string} = {type:'8',name:this.fontContent.attendance_detail};

  sign_list: {type:string,name:string} = {type:'9',name:this.fontContent.sign_list};

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
