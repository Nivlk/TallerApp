import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, catchError, finalize, forkJoin, map, of, tap } from 'rxjs';
import { CarService } from '../../services/car.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalImagesCarComponent } from '../modal-images-car/modal-images-car.component';


@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent {
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
      registration: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', {
        validators: [Validators.required, Validators.pattern('^[0-9]*$')],
        asyncValidators: [this.asyncValidatorExample()],
        updateOn: 'blur'  // Puedes ajustar esto según tus necesidades
      }],
      color: ['', Validators.required],
      status: ['', Validators.required]
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
      const registration = this.carForm.value.registration;
      const model = this.carForm.value.model;
      const year = this.carForm.value.year;
      const color = this.carForm.value.color;
      const status = this.carForm.value.status;
      /// const uploadObservables = this.selectedImages.map(file =>
      this.carService.pushFileToStorage(this.selectedImages).subscribe(
        (downloadURLs) => {
          console.log(downloadURLs)
          const data = {
            user_id: this.data,
            registration: registration,
            model: model,
            year: year,
            color: color,
            status: status,
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
    this.carService.saveData(data).subscribe({
      next: (response) => {
        console.log(response)
        this.carForm.reset();
        this.selectedImages = [];
        this.spinner.hide();
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
    //console.log(rowData)
      // Puedes acceder a params.value para obtener el valor de la acción

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
