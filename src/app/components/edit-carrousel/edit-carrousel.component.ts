import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-carrousel',
  templateUrl: './edit-carrousel.component.html',
  styleUrls: ['./edit-carrousel.component.css']
})
export class EditCarrouselComponent {
  constructor(
    public dialogRef: MatDialogRef<EditCarrouselComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) {
  }
  ngOnInit() {
    console.log(this.data)
  }


  getImageUrl(file: File) {
    // Crea una URL segura para el objeto File
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }
}
