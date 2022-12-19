import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WebApiService } from './webapi.service';

var apiUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  constructor(
              private webApiService: WebApiService,
              private router: Router,
              ) { }

get token(): string {
  return localStorage.getItem('token') || '';
}

  public getAllData(): Observable<any> {
    return this.webApiService.get(apiUrl+'usuarios');
  }

  public deleteDataById(model: any): Observable<any> {
    return this.webApiService.delete(apiUrl+'usuarios' + '/' + model);
  }

  public getDataDetailById(model: any): Observable<any> {
    return this.webApiService.get(apiUrl+'usuarios' + '/' + model);
  }

  public saveData(model: any): Observable<any> {
    return this.webApiService.post(apiUrl+'usuarios', model);
  }

  public UpdateData(id:any,model: any): Observable<any> {
    return this.webApiService.put(apiUrl+'usuarios'+'/'+id, model);
  }
  
  public login(): Observable<any> {
    return this.webApiService.get(apiUrl+'usuarios');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    }

  validarToken(): boolean {
    if(this.token){
      return true;
    }else{
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
