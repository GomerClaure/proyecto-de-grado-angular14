import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/auth/session.service';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formularioLogin: FormGroup;

  constructor(private formBuilder:FormBuilder, private sessionService: SessionService, private router: Router) { 
   this.formularioLogin=this.formBuilder.group({ 
       usuario:[null,Validators.required],
       password:[null,[Validators.required,Validators.minLength(8)]]
   });
  } 
    onSubmit(){
      if(this.formularioLogin.valid){
        const datosLogin=this.formularioLogin.value;
      console.log(datosLogin); 
      this.login();
      }else{
        alert('Datos incorrectos');
      }
    }

    public login() {
      const { usuario, password } = this.formularioLogin.value;
      console.log(usuario, password);
      this.sessionService.login(usuario, password).subscribe(
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

