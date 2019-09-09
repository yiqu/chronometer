import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map, timeout, retry, retryWhen, delayWhen, tap, 
  take, switchMap } from 'rxjs/operators';
import { timer } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';


const headers = new HttpHeaders({
  'Content-Type':  'application/json',
  'Authorization': 'chrono-auth-token'
});
const DEFAULT_TIMEOUT: number = 10000;


@Injectable({
  providedIn: 'root'
})
export class CrudRestServie {

  constructor(public http: HttpClient, public ts: ToastrService) {
    
  }

  /**
   * Generic GET 
   * @param url 
   * @param params 
   */
  getData<T>(url: string, params?: any): Observable<HttpResponse<T>> {
    let u: string = this.getBaseUrl() + url;
    return this.http.get<T>(u, {headers: headers, observe: 'response', responseType: 'json'})
      .pipe(
        timeout(DEFAULT_TIMEOUT),
        retryWhen(errors => this.handleError(errors)),
        delay(environment.restDelay)
      ) 
  }

   /**
   * PUT request to completely replace a resource.
   * 
   * @param dataToPost 
   * @param postUrl 
   */
  putData<T>(dataToPost: T, postUrl: string): Observable<HttpResponse<T>> {
    //https://kq-1-1a499.firebaseio.com/....json
    let url: string = this.getBaseUrl() + postUrl;
    return this.http.put<T>(url, dataToPost, {headers: headers, observe: 'response', responseType: 'json'}).
      pipe(
        timeout(DEFAULT_TIMEOUT),
        retryWhen(errors => this.handleError(errors))
      )
  }

   /**
   * POST request to append to resource.
   * 
   * @param dataToPost 
   * @param postUrl 
   */
  postData<T>(dataToPost: T, postUrl: string): Observable<HttpResponse<T>> {
    let url: string = this.getBaseUrl() + postUrl;
    return this.http.post<T>(url, dataToPost, {headers: headers, observe: 'response', responseType: 'json'})
      .pipe(
        timeout(DEFAULT_TIMEOUT),
        retryWhen(errors => this.handleError(errors)),
        //delay(environment.restDelay)
      )
  }

   /**
   * DELETE request
   * @param deleteUrl 
   */
  deleteData(deleteUrl: string) {
    let url: string = this.getBaseUrl() + deleteUrl;
    return this.http.delete(url, {headers: headers, observe: 'response', responseType: 'json'}).
      pipe(
        timeout(DEFAULT_TIMEOUT)
      )
  }

  handleError(err: Observable<any>) {
    let errorCount = 0;
    return err.pipe(
      delayWhen(() => timer(2000)),
      take(2),
      tap((res) => {
        errorCount += 1;
        this.ts.error("Error: " + res.message + ". <br>Retrying now. (" +errorCount+")/2" , "Error")
      })
    );
  }

  /**
   * Construct URL based on Prod/Dev mode
   * https://kq-1-1a499.firebaseio.com/chronometer.json
   */
  private getBaseUrl(): string {
    return environment.production ? "https://siling1k.firebaseio.com/chronometer/" : 
      "https://kq-1-1a499.firebaseio.com/chronometer/"
  }

  private buildBaseUrl(): string {
    return environment.production ? "https://siling1k.firebaseio.com/chronometer/" : 
      "https://kq-1-1a499.firebaseio.com/chronometer/"
  }
}