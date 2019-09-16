import { Component, OnInit, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { TimeData, TimeDataInformation, TimeTableHeader } from '../model/data.model';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit, OnChanges, OnDestroy {

  @Input('tableData')
  dataSource: any

  @Input('tableHeaders')
  headers: TimeTableHeader[]

  constructor() {
    this.headers = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("table changes: ", this.dataSource, this.headers)
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}