import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  loginForm: FormGroup = this.fb.group({
    'email': ['', [Validators.required]],
    'password': ['', [Validators.required, Validators.minLength(6)]],
  })
  autenticated$: Observable<boolean>;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar ) {
      this.autenticated$ = authService.isAuthenticated();
     }

  ngOnInit() {
    this.isAutenticated();
  }

  onSubmit() {
    const crendentials = this.loginForm.value;
    this.loading = true;
    this.authService.login(crendentials)
      .subscribe(
        (user) => {
          if(user != null){
            this.snackBar.open(
              'Login efetuado com sucesso. Bem vindo ' + user.name + '!', 'OK',
              {duration: 3000});
            this.router.navigateByUrl('/');
            this.loading = false;
          } else {

            this.snackBar.open(
              'Falha no Login: E-mail e/ou Senha inválidos', 'OK', {duration: 3000});
              this.loading = false;
          }
        },
        // (err) => {
        //   console.log(err);
        //   this.snackBar.open(
        //     'Falha no Login: E-mail e/ou Senha inválidos', 'OK', {duration: 3000});
        //     this.loading = false;
        // }
      )
  }
  isAutenticated(){
    this.autenticated$.subscribe(y => {
      console.log(y);
      if(y) {
        this.router.navigateByUrl('/');
      } else {
        this.router.navigateByUrl('/login')
      }
    });
  }
}
