import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sgLength' })
export class LengthPipe implements PipeTransform {
  transform(value: string,length:number): string {
    if(length > -1) {
      return value.substr(0,length);
    } else {
      return value;
    }
  }
}
