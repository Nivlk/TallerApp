import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { ModalImagesCarComponent } from '../modal-images-car/modal-images-car.component';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of, map, catchError } from 'rxjs';
import { CarService } from 'src/app/services/car.service';
import { AddCarComponent } from '../add-car/add-car.component';

@Component({
  selector: 'app-repa-form',
  templateUrl: './repa-form.component.html',
  styleUrls: ['./repa-form.component.css']
})
export class RepaFormComponent {
  carForm!: FormGroup;
  selectedImages: File[] = [];
  imageUrls: any[] = [];
  guardarHabilitado: any;
  percentage = 0;
  defaultImagePath = '../../../assets/img/noimage.jpg';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storage: AngularFireStorage,
    private carService: CarService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef

  ) { }
  ngOnInit() {
    console.log(this.data)
    this.initializeForm();
  }

  initializeForm() {
    this.carForm = this.fb.group({
      category: ['', Validators.required],
      subs: ['', Validators.required],
      fechain: ['', Validators.required],
      fechasal: ['', Validators.required],
      status: ['', Validators.required],
      comments: ['', Validators.required],
      priorioty:['', Validators.required],
     
    });

  }
  asyncValidatorExample(): (control: AbstractControl) => Observable<ValidationErrors | null> {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = control.value;

     
      const asyncValidationObservable =  of(true);

      return asyncValidationObservable.pipe(
        map(isValid => (isValid ? null : { asyncValidation: true })),
        catchError(() => of({ asyncValidation: true }))
      );
    };
  }
openFileInput(): void {
  document.getElementById('file-input')?.click();
}
  handleFileInput(event: any) {
    const files: FileList = event.target.files;
    //this.selectedImages = Array.from(files);
   // console.log(this.selectedImages.length)
    if (files.length === 0) {
     
      return;
    } else {
      this.guardarHabilitado = true;
    }
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];



      this.selectedImages.push(file);
  this.defaultImagePath=this.getObjectUrl(this.selectedImages[0]);
    }
    event.target.value = null;
  }
 
  clearFileInput() {
  //  this.selectedImages = [];
    this.guardarHabilitado = false;
    console.log(this.selectedImages)
  }
  guardar(): void {
    console.log(this.selectedImages.length)
    if (this.selectedImages.length === 0) {
      console.log('No se han seleccionado imágenes.');
      return;
    }
    if (this.carForm.valid && this.selectedImages.length > 0) {
      this.spinner.show();
      this.guardarHabilitado = true;
      const category = this.carForm.value.category;
      const subs = this.carForm.value.subs;
      const fechain = this.carForm.value.fechain;
      const fechasal = this.carForm.value.fechasal;
      const status = this.carForm.value.status;
      const priorioty = this.carForm.value.priorioty;
      const comments = this.carForm.value.comments;
      
      /// const uploadObservables = this.selectedImages.map(file =>
      this.carService.pushFileToStorage(this.selectedImages).subscribe(
        (downloadURLs) => {
          console.log(downloadURLs)
          const data = {
            id_auto: this.data.params.id_auto,
            category: category,
            subs: subs,
            fechain: fechain,
            fechasal: fechasal,
            status: status,
            priorioty: priorioty,
            comments: comments,
            images: downloadURLs
          };
          this.save(data);
        },
        (error) => {
          console.error('Error uploading files:', error);
        }
      );

      this.guardarHabilitado = false;
    } else {
      console.log('Form is not valid or no images selected.');

    }
  }
  save(data: any): void {
    this.carService.saveDataRep(data).subscribe({
      next: (response) => {
        console.log(response)
        this.carForm.reset();
        this.selectedImages = [];
        this.spinner.hide();
        this.dialogRef.close();
      ///  this.selectedImages = null;
      },
      error: (error) => {

        this.carForm.reset();
        this.selectedImages = [];
        console.log(error);
      }
    });
  }
  onClickedMenuAction(event: any): void {
 if(this.selectedImages.length){
    event.preventDefault();
    event.stopPropagation();


    const dialogRef = this.dialog.open(ModalImagesCarComponent, {
      width: '200px',
    
      position: { top: `${event.clientY}px`, left: `${event.clientX}px` },
      data: {
        images:this.selectedImages
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
       this.selectedImages=result;
      }else{
        this.defaultImagePath = '../../../assets/img/noimage.jpg';
      }
    });
  
  }
  
  }
  close(): void {
this.dialogRef.close();
  }
 
  
 
  getObjectUrl(file: File): string {
    if (file) {
      return URL.createObjectURL(file);
    }
    return '';
  }
}
