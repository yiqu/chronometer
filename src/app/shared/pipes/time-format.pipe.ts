import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'timeMomentFormat'})
export class TimeMomentFormat implements PipeTransform {
  transform(value: moment.Moment, format?: string): string {
    let useFormat: string = format ? format : "MMMM Do, dddd, h:mm:ss a";
    
    if (value) {
      return value.format(useFormat);
    }
    return "Loading...";
  }
}