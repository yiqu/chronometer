import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

/**
 * This will be run (number of columns * row per page) amount of times
 */
@Pipe({name: 'columnHeader', pure: true})
export class TableColumnHeaderPipe implements PipeTransform {
  
  transform(value: string, columnId: string): string {
    let result: string;
    switch(columnId) {
      case "duration": {
        result = value + "s";
        break;
      }

      default: {
        result = value;
      }
    }

    return result;
  }
}