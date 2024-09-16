import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario, Propietario } from 'src/app/modelos/usuario/Usuarios';
import { fileValidator } from 'src/app/validators/file-validator';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss']
})
export class DatosPersonalesComponent implements OnInit {
  usuarioForm: FormGroup;
  selectedFile: File = new File([], 'default.jpg');

  constructor(private fb: FormBuilder) {
    this.usuarioForm = this.fb.group({
      // Definir los campos del formulario
      nombre: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      nickname: ['', Validators.required],
      foto_perfil: [null, [Validators.required, fileValidator(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'], 2)]],
      ci: ['', Validators.required] // Campo para el propietario
    });
  }

  ngOnInit(): void {
    const usuarioData: Usuario = {
      id: 1,
      nombre: 'Juan',
      apellido_paterno: 'Pérez',
      apellido_materno: 'González',
      correo: 'juan@example.com',
      nickname: 'juanito123',
      foto_perfil: 'https://via.placeholder.com/220',
      token: '123456'
    };

    const propietarioData: any = {
      id: 1,
      ci: 12345678
    };

    // Actualizar los campos individuales
    this.usuarioForm.patchValue({
      nombre: usuarioData.nombre,
      apellido_paterno: usuarioData.apellido_paterno,
      apellido_materno: usuarioData.apellido_materno,
      correo: usuarioData.correo,
      nickname: usuarioData.nickname,
      foto_perfil: usuarioData.foto_perfil,
      ci: propietarioData.ci
    });
    // this.usuarioForm.markAsTouched();

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



  actualizarUsuario() {
    console.log(this.usuarioForm.value);
    if (this.usuarioForm.valid) {
      // Manejar la lógica al enviar el formulario
      console.log(this.usuarioForm.value);
    }
  }
}
