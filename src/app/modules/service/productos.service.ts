import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WebApiService } from './webapi.service';

var apiUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class ProductosService {

  constructor(
              private webApiService: WebApiService
              ){ }

  public getAllData(): Observable<any> {
    return this.webApiService.get(apiUrl+'productos');
  }

  public deleteDataById(model: any): Observable<any> {
    return this.webApiService.delete(apiUrl+'productos' + '/' + model);
  }

  public getDataDetailById(model: any): Observable<any> {
    return this.webApiService.get(apiUrl+'productos' + '/' + model);
  }

  public saveData(model: any): Observable<any> {
    return this.webApiService.post(apiUrl+'productos', model);
  }

  public UpdateData(id:any,model: any): Observable<any> {
    return this.webApiService.put(apiUrl+'productos'+'/'+id, model);
  }

  
}
