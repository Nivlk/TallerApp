import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddClientComponentComponent } from '../add-client-component/add-client-component.component';
import { AddCarComponent } from '../add-car/add-car.component';
import { CarListComponent } from '../car-list/car-list.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor(public dialogRef: MatDialogRef<ModalComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private dialog: MatDialog) { }
  ngOnInit() {
 console.log(this.data)
  }
  editClient():void{
   
    const dialogRef = this.dialog.open(AddClientComponentComponent, {
      data: this.data,
      panelClass: 'full-screen-dialog', // Aplica la clase de estilo personalizado
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
    
      if (result) {
        this.dialogRef.close(1);
      }
    });
  }
  viewCar():void{
    const dialogRef = this.dialog.open(AddCarComponent, {
      data: this.data.params.id,
      panelClass: 'full-screen-dialog', // Aplica la clase de estilo personalizado
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
    
      if (result) {
        this.dialogRef.close(1);
      }
    });
  }
  viewList():void{
    const dialogRef = this.dialog.open(CarListComponent, {
      data: this.data.params.id,
      panelClass: 'full-screen-dialog', // Aplica la clase de estilo personalizado
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
    
      if (result) {
        this.dialogRef.close(1);
      }
    });
  }
}
