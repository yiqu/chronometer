import { Component, OnInit, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { TimeData, TimeDataInformation, ITimeTableHeader } from '../model/data.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { rowsAnimation, rowsAnimation2 } from '../animations/animations';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: ['./table.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
  animations: [rowsAnimation2]
})

export class TableComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild(MatPaginator, {static: true}) 
  paginator: MatPaginator;

  @Input('tableData')
  dataSource: any[];

  @Input('tableHeaders')
  tableHeaders: ITimeTableHeader[];

  rowFadeInTime: string = "0.4s";
  rowFadeOutTime: string = "0.2s";

  displayedColumns: string[];
  tableDatasource = new MatTableDataSource<TimeData>();
  pagingInAction: boolean = false;

  constructor() {
    this.displayedColumns = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("table changes: ", this.dataSource)
    this.createColumnDisplay();
    this.tableDatasource = this.checkDataSourceValid(this.dataSource);
    this.resetPaginator();
  }

  ngOnInit() {
    this.resetPaginator();
  }
  
  checkDataSourceValid(ds: any[]) {
    if (ds && ds.length > 0 && ds.length === 1 && ds[0]['hashKey'] === null) {
      return new MatTableDataSource<TimeData>([]);
    }
    //ds.splice(0, 1);
    return new MatTableDataSource<TimeData>(ds.reverse());
  }

  createColumnDisplay() {
    this.displayedColumns = [];
    this.tableHeaders.forEach((header: ITimeTableHeader) => {
      this.displayedColumns.push(header.id);
    });
  }

  resetPaginator() {
    this.tableDatasource.paginator = this.paginator;
    this.paginator.firstPage();
  }

  onRowClick(row) {
    console.log(row)
  }

  onPage(page: PageEvent) {
    console.log(page)
    this.pagingInAction = true;
  }

  /**
   * Delay hack to prevent pagingInAction flag to go False to quick before animation
   * could kick in.
   * @param event 
   */
  rowAnimationEnd(event: AnimationEvent) {
    setTimeout(() => {
      this.pagingInAction = false;
    }, 300);
    
  }

  ngOnDestroy() {

  }
}