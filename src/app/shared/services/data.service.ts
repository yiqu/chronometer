import { Injectable } from '@angular/core';
import { Observable, Subject, from, of, Subscription, interval } from 'rxjs';
import * as moment from 'moment';
import { TimeData, TimeDataInformation } from '../model/data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
  }

}