import { Component, OnInit, OnDestroy, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { List } from 'immutable';
import { TimeData, TimeDataInformation } from '../shared/model/data.model';

@Component({
  selector: 'app-history',
  templateUrl: 'history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  timeData: TimeData[];

  constructor() {
  }

  ngOnChanges(change: SimpleChanges) {
    console.table(change.timeData.currentValue.time)
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}