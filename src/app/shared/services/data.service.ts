import { Injectable } from '@angular/core';
import { Observable, Subject, from, of, Subscription, interval, empty } from 'rxjs';
import { take, map, switchMap, exhaustMap, concatMap, tap, delay,
  takeUntil, mergeMap, debounceTime } from 'rxjs/operators';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { TimeData, TimeDataInformation } from '../model/data.model';
import { CrudRestServie } from './crud.service';
import { LoginService } from './login.service';
import { HttpResponse } from '@angular/common/http';
import { UserData } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  timeSaved$: Subject<TimeData> = new Subject();

  constructor(public cs: CrudRestServie, public ls: LoginService, public ts: ToastrService) {

    this.timeSaved$.pipe(
      mergeMap((res: TimeData) => {
        if (this.ls.userData.hashKey) {
          return this.cs.postData(res, this.buildSaveTimeUrl());
        }
        return empty();
      }),
      tap((res: HttpResponse<TimeData>) => {
        this.ts.toastrConfig.timeOut = 1000;
        this.ts.success("Hash key: " + res.body['name'], "Saved")
      }),
      debounceTime(1000),
      concatMap((res) => {
        return this.cs.getData(this.buildSaveTimeUrl());
      })
    ).subscribe({
      next: (res: HttpResponse<any>) => {
        //this.ls.userData.data = new UserData()

      },
      complete: () => {
        console.log("time saver subject is done")
      }
    })
  }

  /**
   * Build the URL to save a time info.
   * i.e. https://kq-1-1a499.firebaseio.com/chronometer/chronometer/-LogeJATho8YCAYarcG7/data/time.json
   * 
   */
  buildSaveTimeUrl(): string {
    return "chronometer/" + this.ls.userData.hashKey + "/" + "data/" + "time.json";
  }

}