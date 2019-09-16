import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

@Pipe({name: 'buttonToggleText', pure: true})
export class timerButtonTextPipe implements PipeTransform {
  
  transform(value: boolean, hasValue: boolean): string {
    if (!value && hasValue) {
      return "Resume";
    } else if (value) {
      return "Stop";
    } else if (!value) {
      return "Start";
    }
  }
}