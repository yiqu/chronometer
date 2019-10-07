import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimationEvent, trigger, transition, useAnimation } from '@angular/animations';
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
import { User } from '../shared/model/user.model';
import { tada, fadeIn, bounce, flash } from 'ng-animate';

const TIMER_START: string = "Start";
const TIMER_STOP: string = "Stop";
const USER_PARAM_KEY: string = "user";

@Component({
  selector: 'app-core',
  templateUrl: 'core.component.html',
  styleUrls: ['./core.component.css'],
  animations: [
    trigger('lapAnime', [
      transition('void => afterview', useAnimation(fadeIn)),
      transition('afterview => lap', useAnimation(tada)),
      transition('* => stop', useAnimation(bounce)),
      transition('* => reset', useAnimation(flash)),
    ]),
  ]
})

export class CoreComponent implements OnInit, OnDestroy {

  snackBarDuration = 1;
  timer$: Observable<number>;
  timerSub: Subscription = new Subscription();
  timerInMilli: number = 0;
  resetLapText: string = "Lap";
  timerStarted: boolean = false;
  currentUser: User;
  resetUserListener: Subject<any> = new Subject();
  tickerAnimateState: string;

  constructor(public ts: TimeService, private sb: MatSnackBar, public router: Router,
    public route: ActivatedRoute, public ls: LoginService, public ds: DataService) {
      this.timer$ = interval(1000);
      this.ls.currentUser$.pipe(
        takeUntil(this.resetUserListener)
      ).subscribe({
        next: (user: User) => {
        this.currentUser = new User(user.user, user.admin, user.isUser, user.data, 
          user.hashKey);
        console.log("USER: ",this.currentUser)
        },
        complete: () => {
          console.log("current user $ done.")
        }
      });
  }

  ngOnInit() {
    this.ts.startCurrentTime();

    this.route.queryParamMap.subscribe((queryParam) => {
      if (queryParam.has(USER_PARAM_KEY)) {
        const userIdParamValue: string = queryParam.get(USER_PARAM_KEY);
        const userSet: boolean = this.currentUser.isUserSet();

        // remove query param '?user' if it exists and no user is logged in
        if (userIdParamValue && !userSet) {
          this.router.navigate(['./'], {
            queryParams: null
          });
        }
      }
    });

    this.tickerAnimateState = 'afterview';
  }

  ngOnDestroy() {
    this.ts.stopCurrentTime();
    this.resetTimer();
    this.resetUserListener.next(true);
    this.resetUserListener.complete();
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
      if (this.timerInMilli > 0) {
        this.resetLapText = "Lap";
      }
      // starting timer
      this.timerSub.unsubscribe();
      this.startTimerSub();
    } else {
      // stopping timer
      this.timerSub.unsubscribe();
      this.resetLapText = "Reset";
      this.tickerAnimateState = 'stop';
    }
  }

  toggleReset() {
    this.openSnackBar();
    if (this.timerStarted) {
      let time = new TimeData(this.timerInMilli, 0, new Date().getTime(), null);
      this.ds.timeSaved$.next(time);
      this.tickerAnimateState = 'lap';
    } else {
      this.resetTimer();
      this.tickerAnimateState = 'reset';
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

  onLapAnimeComplete(event: AnimationEvent) {
    this.tickerAnimateState = 'afterview';
  }

  openSnackBar() {
    this.sb.openFromComponent(ResetLapSnackBarComponent, {
      duration: this.snackBarDuration * 1000,
      data: this.resetLapText,
      panelClass: 'timer-snack-bar'
    });
  }

}
