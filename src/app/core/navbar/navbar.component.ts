import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/modules/service/menu.service';
import { UsuariosService } from 'src/app/modules/service/usuarios.service';
import { Menu } from '../../modules/interfaces/menu.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  menu : Menu[] = [];
  constructor( 
    private http: UsuariosService,
    private httpmenu: MenuService
    ) {
    
   }

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu(){
    this.httpmenu.getMenu().subscribe((data : any) => {
      this.menu = data.body
    })
  }
  logout(){
    this.http.logout();
  }

}