import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WebApiService } from './webapi.service';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {

  private URL_END_POINT: string = `${environment.URL_BACKEND}/productos`;

  constructor(
    private webApiService: WebApiService
  ) { }

  public getAllData(): Observable<any> {
    return this.webApiService.get(this.URL_END_POINT);
  }

  public deleteDataById(id: any): Observable<any> {
    return this.webApiService.delete(this.URL_END_POINT + '/' + id);
  }

  public getDataDetailById(id: any): Observable<any> {
    return this.webApiService.get(this.URL_END_POINT + '/' + id);
  }

  public saveData(formdata: any): Observable<any> {
    return this.webApiService.post(this.URL_END_POINT, formdata);
  }

  public UpdateData(id: any, formdata: any): Observable<any> {
    return this.webApiService.put(this.URL_END_POINT + '/' + id, formdata);
  }


}
