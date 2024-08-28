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

  ngOnInit(): void {}

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.pasoTresForm.patchValue({
        [controlName]: file
      });
      this.pasoTresForm.get(controlName)?.markAsTouched();
    }
  }

  onSubmit(): void {
    console.log(this.formData);
    // Aquí puedes hacer algo con todos los datos del formulario
  }
}

