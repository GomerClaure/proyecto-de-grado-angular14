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
  selectedFiles: { [key: string]: File } = {};
  
  uploadedFile: File | null = null; // Nueva propiedad para almacenar el archivo subido

  ngOnInit(): void {}

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[controlName] = file;
      this.pasoTresForm.patchValue({
        [controlName]: file
      });
      this.pasoTresForm.get(controlName)?.markAsTouched();
      console.log('Control:', controlName);
      console.log('Control:', this.pasoTresForm);
    }
  }
}

