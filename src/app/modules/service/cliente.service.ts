import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WebApiService } from './webapi.service';

var apiUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  constructor(
              private webApiService: WebApiService
              ) { }

  public getClientes(): Observable<any> {
    return this.webApiService.get(apiUrl+'clientes');
  }

  public deleteClienteById(model: any): Observable<any> {
    return this.webApiService.delete(apiUrl+'clientes' + '/' + model);
  }

  public getClienteDetailById(model: any): Observable<any> {
    return this.webApiService.get(apiUrl+'clientes' + '/' + model);
  }

  public saveCliente(model: any): Observable<any> {
    return this.webApiService.post(apiUrl+'clientes', model);
  }

  public UpdateCliente(id:any,model: any): Observable<any> {
    return this.webApiService.put(apiUrl+'clientes'+'/'+id, model);
  }

  
}
