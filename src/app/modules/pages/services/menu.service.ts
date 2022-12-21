import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WebApiService } from './webapi.service';

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  
  private URL_END_POINT: string = `${environment.URL_BACKEND}/menu`;

  constructor(
              private webApiService: WebApiService
              ) { }

  public getMenu(): Observable<any> {
    return this.webApiService.get(this.URL_END_POINT);
  }

}
