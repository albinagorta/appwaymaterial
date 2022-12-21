import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WebApiService } from './webapi.service';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  private URL_END_POINT: string = `${environment.URL_BACKEND}/clientes`;

  constructor(
    private webApiService: WebApiService
  ) { }

  public getClientes(): Observable<any> {
    return this.webApiService.get(this.URL_END_POINT);
  }

  public deleteClienteById(id: any): Observable<any> {
    return this.webApiService.delete(this.URL_END_POINT + '/' + id);
  }

  public getClienteDetailById(id: any): Observable<any> {
    return this.webApiService.get(this.URL_END_POINT + '/' + id);
  }

  public saveCliente(formdata: any): Observable<any> {
    return this.webApiService.post(this.URL_END_POINT, formdata);
  }

  public UpdateCliente(id: any, formdata: any): Observable<any> {
    return this.webApiService.put(this.URL_END_POINT + '/' + id, formdata);
  }


}
