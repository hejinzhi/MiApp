import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sgTTime' })
export class TTimePipe implements PipeTransform {
  transform(value: string): string {
    if(value === null) return value;
    return new Date(Date.parse(value) - 60 * 60 * 8 * 1000).toISOString();
  }
}