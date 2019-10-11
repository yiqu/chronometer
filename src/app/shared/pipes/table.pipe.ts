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
        console.log(+value)
        result = this.convertToTimeFormat(value);
        break;
      }
      case "createDate": {

        break;
      }
      case "endDate": {

        break;
      }
      case "info": {

        break;
      }
      case "hashKey": {

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
}