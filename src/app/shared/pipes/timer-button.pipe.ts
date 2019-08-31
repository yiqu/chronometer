import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

@Pipe({name: 'buttonToggleText', pure: true})
export class timerButtonTextPipe implements PipeTransform {
  
  @memo()
  transform(value: boolean): string {
    return value ? "Stop" : "Start";
  }
}