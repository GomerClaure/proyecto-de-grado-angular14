import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.scss']
})
export class PasoUnoComponent implements OnInit {

  @Input() pasoUnoForm: FormGroup;
  selectedFiles: { [key: string]: File } = {};

  constructor(private fb: FormBuilder) {
    this.pasoUnoForm = this.fb.group({});
  }

  ngOnInit(): void {}

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[controlName] = file;
      this.pasoUnoForm.patchValue({
        [controlName]: file
      });
      this.pasoUnoForm.get(controlName)?.markAsTouched();
    }
  }
}
