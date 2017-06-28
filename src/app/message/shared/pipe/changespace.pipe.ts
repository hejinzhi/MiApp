import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sgChangeSpace' })
export class ChangeSpace implements PipeTransform {

  transform(value: string): string {
    let str1 = value.replace(/(\r\n)|(\n)/g, '<br>');
    str1 = str1.replace(/\s/g,"&#8194;");
    return str1;
  }

}
