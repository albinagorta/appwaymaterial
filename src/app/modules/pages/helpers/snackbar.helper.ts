import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class snackBarHelper {
  constructor(
    private sBar: MatSnackBar
              ) { }

  public success(message: string, accion:string = 'X'):void {
    this.sBar.open(message, accion, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration:2500,
      panelClass: ['snackBar-success'],
    });
  }

  public error(message: string, accion:string = 'X'):void {
    this.sBar.open(message, accion, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration:2500,
      panelClass: ['snackBar-error'],
    });
  }

  public info(message: string, accion:string = 'X'):void {
    this.sBar.open(message, accion, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration:2500,
      panelClass: ['snackBar-info'],
    });
  }


}
