import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sgTTime' })
export class TTimePipe implements PipeTransform {
  transform(value: string): string {
    if(value === null) return value;
    return value.replace('T',' ');
  }
}
