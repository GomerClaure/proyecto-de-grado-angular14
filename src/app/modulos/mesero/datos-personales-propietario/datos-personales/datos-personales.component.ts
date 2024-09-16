import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario, Propietario } from 'src/app/modelos/usuario/Usuarios';
import { SessionService } from 'src/app/services/auth/session.service';
import { fileValidator } from 'src/app/validators/file-validator';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss']
})
export class DatosPersonalesComponent implements OnInit {
  usuarioForm: FormGroup;
  selectedFile: File = new File([], 'default.jpg');

  constructor(private fb: FormBuilder, private sessionService: SessionService) {  
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      apellido_paterno: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      apellido_materno: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      correo: ['', [Validators.required, Validators.email]],
      ci: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(7)]],
      nickname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      foto_perfil: [null, []]
    });
  }

  ngOnInit(): void {
    let idUsuario = sessionStorage.getItem('id_user')||'';
    this.sessionService.getDatosPersonales( idUsuario).subscribe((res: any) => {
      let propietario: Propietario = res.user;  
      console.log(propietario);
      this.usuarioForm.patchValue(propietario.usuario);
      this.usuarioForm.patchValue({ci: propietario.ci});
      this.usuarioForm.markAllAsTouched();
    }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const fileControl = this.usuarioForm.get('foto_perfil');
    const foto_perfil = this.usuarioForm.get('foto_perfil')?.value;
    if (file) {

      this.selectedFile = file;
      this.usuarioForm.patchValue({
        ['foto_perfil']: file
      });
      this.usuarioForm.get('foto_perfil')?.markAsTouched();
      if (this.usuarioForm.get('foto_perfil')?.valid) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.usuarioForm.patchValue({
            foto_perfil: reader.result
          });
        };
        reader.readAsDataURL(file);
      } else {
        this.usuarioForm.patchValue({
          foto_perfil: foto_perfil
        });
        if(this.usuarioForm.get('foto_perfil')?.errors?.['invalidoTipoArchivo']){
        // obtener por clase
        }
      }
      // quiero ver que error da
      console.log('Control:', this.usuarioForm.get('foto_perfil')?.errors);

    }


  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://via.placeholder.com/220'; // URL de la imagen de reemplazo
  }
  

  actualizarUsuario() {
    console.log(this.usuarioForm.value);
    console.log(this.usuarioForm.valid);
    if (this.usuarioForm.valid) {
      // Manejar la lógica al enviar el formulario
      console.log(this.usuarioForm.value);
    }
  }
}
