import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WebApiService } from './webapi.service';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  private URL_END_POINT: string = `${environment.URL_BACKEND}/usuarios`;

  constructor(
    private webApiService: WebApiService,
    private router: Router,
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

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

  public login(): Observable<any> {
    return this.webApiService.get(this.URL_END_POINT);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  validarToken(): boolean {
    if (this.token) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
