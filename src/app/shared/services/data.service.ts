import { Injectable } from '@angular/core';
import { Observable, Subject, from, of, Subscription, interval, empty } from 'rxjs';
import { take, map, switchMap, exhaustMap, concatMap, tap, 
  takeUntil, mergeMap } from 'rxjs/operators';
import * as moment from 'moment';
import { TimeData, TimeDataInformation } from '../model/data.model';
import { CrudRestServie } from './crud.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  timeSaved$: Subject<TimeData> = new Subject();

  constructor(public cs: CrudRestServie, public ls: LoginService) {

    this.timeSaved$.pipe(
      concatMap((res: TimeData) => {
        console.log(res, this.ls.userData)
        return empty();
      })
    ).subscribe(
      {
        next: (res) => {

        },
        complete: () => {
          console.log("time saver subject is done")
        }
      }
    )
  }


}