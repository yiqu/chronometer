import { Component, OnInit, OnDestroy, Input, Output, OnChanges, SimpleChanges,
  ChangeDetectionStrategy } from '@angular/core';
import { List } from 'immutable';
import { TimeData, TimeDataInformation } from '../shared/model/data.model';
import * as UTILS from '../shared/utils/general.utils';
import { UserData } from '../shared/model/user.model';

@Component({
  selector: 'app-history',
  templateUrl: 'history.component.html',
  styleUrls: ['./history.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HistoryComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  timeData: UserData;

  tableData: any;

  constructor() {
  }

  ngOnChanges(change: SimpleChanges) {
    console.log("changed in history",change.timeData.currentValue);
    console.log(this.timeData.time.length)
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}