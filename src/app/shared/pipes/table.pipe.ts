import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';
import * as moment from "moment";

/**
 * This will be run (number of columns * row per page) amount of times
 */
@Pipe({name: 'columnHeader', pure: true})
export class TableColumnHeaderPipe implements PipeTransform {
  
  transform(value: any, columnId: string): string {
    let result: string;
    switch(columnId) {
      case "duration": {
        result = this.convertToTimeFormat(value);
        break;
      }
      case "createDate": {
        result = this.convertToDataFormat(value);
        break;
      }
      case "endDate": {
        result = this.convertToDataFormat(value);
        break;
      }
      case "info": {

        break;
      }
      case "hashKey": {
        result = this.shortenString(value);
        break;
      }

      default: {
        result = value;
      }
    }

    return result;
  }

  convertToTimeFormat(sec: number): string {
    const dur: moment.Duration = moment.duration(sec, "s");
    const seconds: string = ("" + dur.seconds()).padStart(2, "0");
    const minutes: string = ("" + dur.minutes()).padStart(2, "0");
    const hours: string = ("" + dur.hours()).padStart(2, "0");
    return hours + ":" + minutes + ":" + seconds;
  }

  convertToDataFormat(milli: number): string {
    const date = moment.utc(milli).format("MM/DD/YY HH:mm:ss");
    return date;
  }

  shortenString(val: string) {
    if (val) {
      const first = val.slice(0,3);
      const last = val.slice(-4);
      return first + ".." +  last;
    }
    return "NONE";
  }
}