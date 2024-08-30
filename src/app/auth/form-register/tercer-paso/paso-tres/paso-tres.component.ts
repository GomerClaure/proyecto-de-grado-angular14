import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrls: ['./paso-tres.component.scss']
})
export class PasoTresComponent implements OnInit {

  @Input() pasoTresForm!: FormGroup;
  @Input() formData!: any;
  
  uploadedFile: File | null = null; // Nueva propiedad para almacenar el archivo subido

  ngOnInit(): void {}

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.uploadedFile = file; // Guarda el archivo en la propiedad
      this.pasoTresForm.get(controlName)?.setValue(this.uploadedFile); // Puedes almacenar el nombre del archivo o mantener un campo oculto
      this.pasoTresForm.get(controlName)?.markAsTouched();
      console.log('File:', this.uploadedFile);
    } else {
      this.uploadedFile = null; // Resetea el archivo si no hay archivo seleccionado
      this.pasoTresForm.get(controlName)?.reset();
    }
  }
}

