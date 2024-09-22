import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.scss']
})
export class PasoDosComponent implements OnInit, AfterViewInit {

  @Input() pasoDosForm!: FormGroup;
  public tiposEstablecimiento: string[];

  constructor(private http: HttpClient) {
    this.tiposEstablecimiento = ['Restaurante', 'Cafetería', 'Bar',
       'Pasteleria', 'Pizzería', 'Comida rápida', 'Heladería', 'Otro'];
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
  }

  

}
