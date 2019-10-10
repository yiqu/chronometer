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
        result = value + "s";
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
}