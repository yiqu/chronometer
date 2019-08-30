import { Injectable } from '@angular/core';
import { Observable, Subject, from, of, Subscription, interval } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  currentTime: moment.Moment;
  currentTimeSub: Subscription = new Subscription();
  shortDateFormat: string = "dddd, h:mm:ss a";

  constructor() {
  }

  startCurrentTime() {
    this.stopCurrentTime();
    this.currentTimeSub = interval(1000).subscribe((val: number) => {
      this.currentTime = moment();
    });
  }

  stopCurrentTime() {
    this.currentTimeSub.unsubscribe();
  }
}