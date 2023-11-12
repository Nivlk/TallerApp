import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  username = '';
  role = '';
  hide = true;
  public submitted = false;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private formBuilder: FormBuilder,

  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
  
    if(this.isLoggedIn){
      this.router.navigate(['/home']);
    }
    const token = this.tokenStorage.getToken();
    if (token) {
      this.authService.updateLoginStatus(true, this.tokenStorage.getUserRole())
      this.router.navigate(['/home']);
    }
    console.log(token)
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      console.log(this.form.value)
      this.authService.authenticate(this.form.value).subscribe(
        response => {
          this.tokenStorage.saveToken(response.access_token);
          this.tokenStorage.saveUser(response);

         // this.authService.updateLoginStatus(true, response.roles[0])
          this.updateLoginStatus(response.access_token);

          this.reloadPage();
        },
        error => {
          this.errorMessage = error;
          this.isLoginFailed = true;
        }
      );
    }
  }

  private updateLoginStatus(token: string): void {
    this.isLoggedIn = true;
    const tokenPayload = jwtDecode<any>(token);
    this.username = this.tokenStorage.getUsername();

    if (tokenPayload.roles && tokenPayload.roles.length > 0) {
      this.role = tokenPayload.roles[0];
    }
  }

  reloadPage(): void {
   // window.location.reload();
    this.router.navigate(['/home']);
  }
}
