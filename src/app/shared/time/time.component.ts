import { Component, OnInit } from '@angular/core';
import { Observable, Subject, from, of, Subscription, interval } from 'rxjs';
import { delay, concatMap, map, takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-shared-time',
  templateUrl: 'time.component.html',
  styleUrls: ['./time.component.css']
})

export class TimeComponent implements OnInit {

  constructor(public ts: TimeService) {
  }

  ngOnInit() {
  }
}