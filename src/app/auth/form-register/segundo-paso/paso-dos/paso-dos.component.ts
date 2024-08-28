import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.scss']
})
export class PasoDosComponent implements OnInit {

  @Input() pasoDosForm!: FormGroup;

  ngOnInit(): void {}
}

