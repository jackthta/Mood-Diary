import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router, private databaseService: DatabaseService) { }

  ngOnInit(): void {
  }

  tryLogin() {

    this.auth.doLoginWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
      .then(
        (res) => this.populateData(res.user),
        (error) => {
          //xTODO: Make error message more fitting for user.

          console.log(error);
          this.errorMessage = error.message;
        }
      );
  }

  tryGoogleLogin() {
    this.auth.doGoogleLogin()
      .then((res) => this.populateData(res.user));
  }

  populateData(user) {
    // Set user in AuthService.
    this.auth.setUser(user);

    // Grab data from real-time database and set into DatabaseService.
    this.databaseService.setRTDBData(this.auth.getUserUID());
    this.router.navigateByUrl('home'); // Successful login, navigate to home.
  }

  // Getter functions
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

}
