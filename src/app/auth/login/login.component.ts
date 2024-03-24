import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/auth/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formularioLogin: FormGroup;

  constructor(private formBuilder:FormBuilder,
    private sessionService: SessionService, private router: Router) { 
   this.formularioLogin=this.formBuilder.group({
    usuario:[''],
    password:['']
   });
  } 
    onSubmit(){
      const datosLogin=this.formularioLogin.value;
      console.log(datosLogin); 
      this.login();
    }

    public login() {
      const { user, password } = this.formularioLogin.value;
      this.sessionService.login(user, password).subscribe(
        res => {
          if (res) {
            alert('Inicio de sesión exitoso.');
            this.router.navigate(['/']);
          }
        },
        err => {
          console.log(err);
          console.log(err.error.message);
         alert('Usuario o contraseña incorrectos.');
        });
    }
    
  } 

