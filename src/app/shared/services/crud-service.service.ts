import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map, timeout, retry, retryWhen, delayWhen, tap, take } from 'rxjs/operators';
import { timer } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';


const headers = new HttpHeaders({
  'Content-Type':  'application/json',
  'Authorization': 'my-auth-token'
});


@Injectable()
export class CrudRestServie {

  constructor() {
    
  }




  /**
   * Construct URL based on Prod/Dev mode
   */
  getBaseUrl(): string {
    return environment.production ? "https://siling1k.firebaseio.com/panel/" : "https://kq-1-1a499.firebaseio.com/panel2/"
  }

  buildBaseUrl(): string {
    return environment.production ? "https://siling1k.firebaseio.com/" : "https://kq-1-1a499.firebaseio.com/"
  }
}