import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WebApiService } from './webapi.service';

var apiUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class CategoriasService {
  constructor(
              private webApiService: WebApiService
              ) { }

  public getAllData(): Observable<any> {
    return this.webApiService.get(apiUrl+'categorias');
  }

  public deleteDataById(model: any): Observable<any> {
    return this.webApiService.delete(apiUrl+'categorias' + '/' + model);
  }

  public getDataDetailById(model: any): Observable<any> {
    return this.webApiService.get(apiUrl+'categorias' + '/' + model);
  }

  public saveData(model: any): Observable<any> {
    return this.webApiService.post(apiUrl+'categorias', model);
  }

  public UpdateData(id:any,model: any): Observable<any> {
    return this.webApiService.put(apiUrl+'categorias'+'/'+id, model);
  }
}
