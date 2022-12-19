import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WebApiService } from './webapi.service';

var apiUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  constructor(
              private webApiService: WebApiService
              ) { }

  public getMenu(): Observable<any> {
    return this.webApiService.get(apiUrl+'menu');
  }

}
