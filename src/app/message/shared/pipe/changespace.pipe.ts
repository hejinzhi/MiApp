import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sgChangeSpace' })
export class ChangeSpace implements PipeTransform {

  transform(value: string): string {
    console.log(value);
    let str1 = value.replace(/(\r\n)|(\n)/g,'<br>');
    console.log(str1);
    return str1;
  }

}
