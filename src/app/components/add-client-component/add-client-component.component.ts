import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client-component',
  templateUrl: './add-client-component.component.html',
  styleUrls: ['./add-client-component.component.css']
})
export class AddClientComponentComponent {
  clienteForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<AddClientComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.clienteForm = this.fb.group({
      identificador: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: [''],
      correo: ['', [Validators.required, Validators.email]]
    });

    // If data is provided, populate the form for editing
    if (this.data.params) {
      const { firstname, lastname, email, number, location, ci } = this.data.params;
      this.clienteForm.patchValue({ nombre: firstname, apellidos: lastname, correo: email, telefono: number, direccion: location, identificador: ci });
    }
  }

  close() {

    this.dialogRef.close(1);
  }

  guardarCliente() {
    if (this.clienteForm.valid) {
      const identificador = this.clienteForm.value.identificador;
      const nombre = this.clienteForm.value.nombre;
      const apellidos = this.clienteForm.value.apellidos;
      const telefono = this.clienteForm.value.telefono;
      const direccion = this.clienteForm.value.direccion;
      const correo = this.clienteForm.value.correo;


      if (this.data) {
        // Editing existing client
        const data = {
          ci: identificador,
          email: correo,
          firstname: nombre,
          lastname: apellidos,
          location: direccion,
          number: telefono,
          role: 'USER',
          status: 1,
          id:this.data.params.id
        };

        this.userService.updateData(data).subscribe({
          next: (response) => {
            console.log(response);
            this.dialogRef.close(1);
         //   this.router.navigate(['/home']); 
          },
          error: (error) => {
            console.log(error);
          }
        });
      } else {
        // Adding a new client
        const password = this.generarPasswordAleatoria(8);

        const data = {
          ci: identificador,
          email: correo,
          firstname: nombre,
          lastname: apellidos,
          location: direccion,
          number: telefono,
          password: password,
          role: 'USER',
          status: 1
        };

        this.userService.saveData(data).subscribe({
          next: (response) => {
            console.log(response);
            this.dialogRef.close();
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    }
  }

  generarPasswordAleatoria(longitud: number): string {
    const caracteresPermitidos =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=_+';
    let password = '';

    for (let i = 0; i < longitud; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
      password += caracteresPermitidos.charAt(indiceAleatorio);
    }

    return password;
  }
}
