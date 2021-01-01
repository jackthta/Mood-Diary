import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    transferData: new FormControl(false, [])
  });
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router, private databaseService: DatabaseService) { }

  ngOnInit(): void {
  }

  tryRegister() {
    this.auth.doRegisterWithEmailAndPassword(this.email.value, this.password.value)
      .then((res) => {
        // Set user in AuthService.
        this.auth.setUser(res.user);

        // Transfer Local Storage data to Real-time database if user wants to.
        if (this.registerForm.get('transferData').value) {
          this.databaseService.transferLocalStorageDBToRealTimeDB();
        }

        // Successful registration, move to home.
        this.router.navigateByUrl('home');
      })
      .catch((err) => {
        console.log(err);
        // Error with registration, prmopt user to try again.
        this.errorMessage = 'Please refresh the page and try again.'
      });
  }

  tryGoogleLogin() {
    this.auth.doGoogleLogin()
      .then((res) => {
        // Successful authentication, travel to home.
        this.router.navigateByUrl('home');

        //TODO: May have to set user token in AuthService, but maybe can do it there instead of here.
      });
  }

  passwordsMatch(password1: string, password2: string) {
    return password1.normalize() === password2.normalize();
  }

  // Getter functions
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confPassword() { return this.registerForm.get('confirmPassword'); }

}
