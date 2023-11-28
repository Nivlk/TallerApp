import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditCarrouselComponent } from '../edit-carrousel/edit-carrousel.component';

@Component({
  selector: 'app-modal-images-car',
  templateUrl: './modal-images-car.component.html',
  styleUrls: ['./modal-images-car.component.css']
})
export class ModalImagesCarComponent {
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalImagesCarComponent>
    ,@Inject(MAT_DIALOG_DATA) public data: any
) {

}
ngOnInit() {
  console.log(this.data)
   }
  openEditCarrouselModal(): void {
    const dialogRef = this.dialog.open(EditCarrouselComponent, {
      data: {
        // image:imgUrl,
        // id:id
       images:this.data
      },
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '100%',
      height: '100%',
      panelClass: 'fullscreen-modal',
      backdropClass: 'fullscreen-modal-backdrop',

    });

    dialogRef.afterClosed().subscribe((data) => {
      /*
      console.log('image',data);

      const index = this.selectedFiles.findIndex(file => file.id === data.id);
      if (index >= 0) {
        this.selectedFiles[index] = {
          url: data.image,
          isVideo: false,
          id: data.id

        };
      } else {
        console.log('No se encontró una imagen con el ID especificado.');
      }
*/

    });
  }
}
