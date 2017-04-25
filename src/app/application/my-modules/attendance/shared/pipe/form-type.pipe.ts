import { Pipe, PipeTransform } from '@angular/core';

import { FormType } from '../config/form-type';

@Pipe({name: 'sgFormType'})
export class FormTypePipe implements PipeTransform {
  formType = new FormType();
  transform(value: string): string {
    let defined = this.formType.type.filter((item) => {
      return item.type === value;
    });
    if(defined.length>0){
      return defined[0].name;
    }else{
      return '我的异常'
    }
  }
}
