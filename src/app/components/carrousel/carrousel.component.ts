import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent {
  constructor(public dialogRef: MatDialogRef<CarrouselComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private dialog: MatDialog) { }
    
  activeSlideIndex = 0;

  slides:any;
  ngOnInit() {
    console.log(this.data)
    this.slides=this.data.params.media_data
     }
     close(){
      this.dialogRef.close();
     }
}
