import { Component, OnInit } from '@angular/core';
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