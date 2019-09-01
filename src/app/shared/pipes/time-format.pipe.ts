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

@Pipe({name: 'timeFormat'})
export class TimeDisplayFormat implements PipeTransform {
  transform(value: number, format?: string) {
    let dur = moment.duration(value * 1000);
    let day = dur.days();
    let hour = dur.hours();
    let min = dur.minutes();
    let sec = dur.seconds();
    let ms = dur.milliseconds();
    
    return "" + (day > 0 ? (day + " : ") : "") + 
      (hour < 10 ? "0" : "") + hour + ":" +
      (min < 10 ? "0" : "") + min + ":" + 
      (sec < 10 ? "0" : "") + sec;
  }
}