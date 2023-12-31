import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CarrouselComponent } from '../carrousel/carrousel.component';
import { RepaListComponent } from '../repa-list/repa-list.component';

@Component({
  selector: 'app-car-actions-component',
  templateUrl: './car-actions-component.component.html',
  styleUrls: ['./car-actions-component.component.css']
})
export class CarActionsComponentComponent {
  constructor(public dialogRef: MatDialogRef<CarActionsComponentComponent>,
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
  viewRep(){
    const dialogRef = this.dialog.open(RepaListComponent, {
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
