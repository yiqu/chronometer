import { Injectable } from '@angular/core';
import { Observable, Subject, from, of, Subscription, interval, empty } from 'rxjs';
import { take, map, switchMap, exhaustMap, concatMap, tap, delay,
  takeUntil, mergeMap } from 'rxjs/operators';
import * as moment from 'moment';
import { TimeData, TimeDataInformation } from '../model/data.model';
import { CrudRestServie } from './crud.service';
import { LoginService } from './login.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  timeSaved$: Subject<TimeData> = new Subject();

  constructor(public cs: CrudRestServie, public ls: LoginService) {

    this.timeSaved$.pipe(
      mergeMap((res: TimeData) => {
        return this.cs.postData(res, this.buildSaveTimeUrl())
      })
    ).subscribe({
      next: (res: HttpResponse<TimeData>) => {
        console.log("res:",res)
      },
      complete: () => {
        console.log("time saver subject is done")
      }
    })
  }

  /**
   * Build the URL to save a time info.
   * i.e. https://kq-1-1a499.firebaseio.com/chronometer/chronometer/-LogeJATho8YCAYarcG7/data/time.json
   */
  buildSaveTimeUrl(): string {
    return "chronometer/" + this.ls.userData.hashKey + "/" + "data/" + "time.json";
  }

}