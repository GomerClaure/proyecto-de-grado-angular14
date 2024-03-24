import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formularioLogin: FormGroup;

  constructor(private formBuilder:FormBuilder) { 
   this.formularioLogin=this.formBuilder.group({ 
       nombre:[null,[Validators.required,Validators.minLength(4)]],
       password:[null,[Validators.required,Validators.minLength(8)]]
   });
  } 
    onSubmit(){
      if(this.formularioLogin.valid){
        const datosLogin=this.formularioLogin.value;
        console.log(datosLogin); 
        alert("Usuario correcto")
      }else{
        alert("No validos")
      }
    }
  } 

