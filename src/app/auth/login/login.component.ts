import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formularioLogin: FormGroup;

  constructor(private formBuilder:FormBuilder) { 
   this.formularioLogin=this.formBuilder.group({
       nombre:[''],
       pass:['']
   });
  } 
    onSubmit(){
      const datosLogin=this.formularioLogin.value;
      console.log(datosLogin);
    }
  } 

