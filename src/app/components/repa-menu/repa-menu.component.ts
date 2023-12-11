import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CarrouselComponent } from '../carrousel/carrousel.component';
import { RepaFormComponent } from '../repa-form/repa-form.component';

@Component({
  selector: 'app-repa-menu',
  templateUrl: './repa-menu.component.html',
  styleUrls: ['./repa-menu.component.css']
})
export class RepaMenuComponent {
  constructor(public dialogRef: MatDialogRef<RepaMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private dialog: MatDialog) { }
  ngOnInit() {
 console.log(this.data)
  }
  viewCar():void{
    const dialogRef = this.dialog.open(CarrouselComponent, {
      data: this.data,
      panelClass: 'full-screen-dialog', // Aplica la clase de estilo personalizado
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
    
      if (result) {
        this.dialogRef.close(1);
      }
    });
  }

  addRep(){
    const dialogRef = this.dialog.open(RepaFormComponent, {
      data: this.data,
      panelClass: 'full-screen-dialog', // Aplica la clase de estilo personalizado
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
    
      if (result) {
        this.dialogRef.close(1);
      }
    });
  }
}
