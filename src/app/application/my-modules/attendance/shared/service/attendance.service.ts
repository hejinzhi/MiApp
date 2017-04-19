import { Injectable } from '@angular/core';
import { MyHttpService } from '../../../../../core/services/myHttp.service';
import { MyFormModel } from '../models/my-form.model'

@Injectable()
export class AttendanceService {
  constructor(private myHttp: MyHttpService) {  }

  getSelectType(type:string){
    return this.myHttp.post('',{type:type}).then((res) => {
      return Promise.resolve(res.json())
    });
  }

  submit(formData:MyFormModel) {
    return this.myHttp.post('',formData).then((res) => {
      return Promise.resolve(res.json())
    });
  }

  save(formData:MyFormModel) {
    return this.myHttp.post('',formData).then((res) => {
      return Promise.resolve(res.json())
    });
  }

  cancel(formData:MyFormModel) {
    return this.myHttp.post('',formData).then((res) => {
      return Promise.resolve(res.json())
    });
  }

  callback(formData:MyFormModel) {
    return this.myHttp.post('',formData).then((res) => {
      return Promise.resolve(res.json())
    });
  }

  getForm(type:string) {
    return this.myHttp.post('',{type:type}).then((res) => {
      return Promise.resolve(res.json())
    });
  }
}
