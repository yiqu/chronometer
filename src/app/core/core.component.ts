import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeService } from '../shared/services/time.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, from, of, Subscription, interval, timer } from 'rxjs';
import { delay, concatMap, map, takeUntil, startWith, timeInterval } from 'rxjs/operators';
import * as moment from 'moment';
import { List } from 'immutable';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResetLapSnackBarComponent } from '../shared/snack-bars/reset-lap.component';
import { TimeData, TimeDataInformation } from '../shared/model/data.model';
import { LoginService } from '../shared/services/login.service';
import { DataService } from '../shared/services/data.service';

const TIMER_START: string = "Start";
const TIMER_STOP: string = "Stop";
const USER_PARAM_KEY: string = "user";

@Component({
  selector: 'app-core',
  templateUrl: 'core.component.html',
  styleUrls: ['./core.component.css']
})

export class CoreComponent implements OnInit, OnDestroy {

  snackBarDuration = 1;

  timer$: Observable<number>;
  timerSub: Subscription = new Subscription();
  timerInMilli: number = 0;

  resetLapText: string = "Lap";
  timerStarted: boolean = false;

  constructor(public ts: TimeService, private sb: MatSnackBar, public router: Router,
    public route: ActivatedRoute, public ls: LoginService, public ds: DataService) {
      this.timer$ = interval(1000);
  }

  ngOnInit() {
    console.log("Init Core Component");
    console.log(this.ls.userData)

    this.ts.startCurrentTime();

    this.route.queryParamMap.subscribe((queryParam) => {
      if (queryParam.has(USER_PARAM_KEY)) {
        const userIdParamValue: string = queryParam.get(USER_PARAM_KEY);
        const userSet: boolean = this.ls.userData.isUserSet();

        // remove query param '?user' if it exists and no user is logged in
        if (userIdParamValue && !userSet) {
          this.router.navigate(['./'], {
            queryParams: null
          });
        }
      }
    });
  }

  ngOnDestroy() {
    this.ts.stopCurrentTime();
    this.resetTimer();
  }

  private startTimerSub() {
    this.timerSub = this.timer$.subscribe({
      next: this.handleTimerNext.bind(this), 
      error: null, 
      complete: this.handleTimerComplete.bind(this)
    });
  }

  toggleStart() {
    this.timerStarted = !this.timerStarted;
    if (this.timerStarted) {
      // starting timer
      this.timerSub.unsubscribe();
      this.startTimerSub();
    } else {
      // stopping timer
      this.timerSub.unsubscribe();
      this.resetLapText = "Reset";
    }
  }

  toggleReset() {
    this.openSnackBar();
    if (this.timerStarted) {
      // lap
      console.log("lapping: ",this.timerInMilli)

    } else {
      this.resetTimer();
    }
    
  }

  private resetTimer() {
    this.timerSub.unsubscribe();
    this.timerInMilli = 0;
    this.timerStarted = false;
    this.resetLapText = "Lap";
  }

  handleTimerNext(val: number) {
    this.timerInMilli++;
  }

  handleTimerComplete() {
    console.log("interval completed");
  }

  openSnackBar() {
    this.sb.openFromComponent(ResetLapSnackBarComponent, {
      duration: this.snackBarDuration * 1000,
      data: this.resetLapText,
      panelClass: 'timer-snack-bar'
    });
  }

}
