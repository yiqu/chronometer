import { Component, OnInit, OnDestroy, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { List } from 'immutable';
import { TimeData, TimeDataInformation } from '../shared/model/data.model';
import * as UTILS from '../shared/utils/general.utils';

@Component({
  selector: 'app-history',
  templateUrl: 'history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  timeData: TimeData[];

  tableData: any;

  constructor() {
  }

  ngOnChanges(change: SimpleChanges) {
    console.log("changed in history",change.timeData.currentValue.time)
    this.tableData = UTILS.objectToArray(change.timeData.currentValue.time);
    console.log(this.tableData)
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}