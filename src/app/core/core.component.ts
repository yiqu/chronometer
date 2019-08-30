import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeService } from '../shared/services/time.service';

@Component({
  selector: 'app-core',
  templateUrl: 'core.component.html',
  styleUrls: ['./core.component.css']
})

export class CoreComponent implements OnInit, OnDestroy {

  constructor(public ts: TimeService) {

  }

  ngOnInit() {
    this.ts.startCurrentTime();
  }

  ngOnDestroy() {
    this.ts.stopCurrentTime();
  }
}