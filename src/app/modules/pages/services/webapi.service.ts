import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  constructor(private httpClient: HttpClient) {
  }

  // Get call method
  // Param 1 : authToken
  // Param 2 : url
  get(url: string, parameters : any = null): Observable<any> {

     let params = new HttpParams();

     if (parameters != null) {
         params = (parameters.page == undefined) ? params : params.append('_page', parameters.page);
         params = (parameters.limit == undefined) ? params : params.append('_limit', parameters.limit);
         params = (parameters.q == undefined) ? params : params.append('q', parameters.q);
     }
     
     const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }),
      observe: "response" as 'body',
      params
    };

    return this.httpClient.get(
      url,
      httpOptions,
    )
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)
      );
  }

  // Post call method
  // Param 1 : authToken
  // Param 2 : url
  // Param 3 : model
  post(url: string, model: any): Observable<any> {
    return this.httpClient.post<any>(url, model)
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)
      );
  }

  // PUT call method
  // Param 1 : authToken
  // Param 2 : url
  // Param 3 : model
  put(url: string, model: any): Observable<any> {
    return this.httpClient.put<any>(url, model)
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)
      );
  }


  // DELETE call method
  // Param 1 : authToken
  // Param 2 : url
  delete(url: string): Observable<any> {
    return this.httpClient.delete<any>(url).pipe(
      map((response: any) => this.ReturnResponseData(response)),
      catchError(this.handleError)
    );
  }



  private ReturnResponseData(response: any) {
    return response;
  }

  private handleError(error: any) {
    return throwError(error);
  }

}

