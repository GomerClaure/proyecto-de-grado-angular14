import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Propietario } from 'src/app/modelos/usuario/Usuarios';
import { SessionService } from 'src/app/services/auth/session.service';
import { fileValidator } from 'src/app/validators/file-validator';
import { NgToastService } from 'ng-angular-popup';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss']
})
export class DatosPersonalesComponent implements OnInit {
  usuarioForm: FormGroup;
  selectedFile: File | null = null;
  url_base = environment.backendStorageUrl;
  foto_perfil = 'https://via.placeholder.com/220';

  constructor(private fb: FormBuilder, private sessionService: SessionService,
    private toast: NgToastService
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      apellido_paterno: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      apellido_materno: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      correo: ['', [Validators.required, Validators.email]],
      ci: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(7)]],
      nickname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      foto_perfil: [null, fileValidator(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'], 2)]
    });
  }

  ngOnInit(): void {
    let idUsuario = sessionStorage.getItem('id_user') || '';
    this.sessionService.getDatosPersonales(idUsuario).subscribe((res: any) => {
      let propietario: Propietario = res.user;
      console.log(propietario);
      this.usuarioForm.patchValue(propietario.usuario);
      this.usuarioForm.patchValue({ ci: propietario.ci });
      this.usuarioForm.patchValue({ foto_perfil: null });
      this.foto_perfil = this.url_base + propietario.usuario.foto_perfil;
      this.usuarioForm.markAllAsTouched();
    }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      // Asignar el archivo seleccionado y actualizar el control del formulario
      this.selectedFile = file;
      this.usuarioForm.patchValue({ foto_perfil: file });
      this.usuarioForm.get('foto_perfil')?.markAsTouched();
      
      // Verificar si el archivo es válido
      if (this.usuarioForm.get('foto_perfil')?.valid) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.foto_perfil = e.target?.result as string; // Mostrar vista previa del archivo
        };
        reader.readAsDataURL(file);
      }else{
        this.showError('Archivo no válido.');
        this.selectedFile = null;
        this.usuarioForm.patchValue({ foto_perfil: null });
      }
    }
  }
  

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://via.placeholder.com/220'; // URL de la imagen de reemplazo
  }

  showError(message: string) {
    this.toast.error({ detail: "ERROR", summary: message, sticky: true });
  }

  showInfo(message: string) {
    this.toast.info({ detail: "INFO", summary: message, sticky: true });
  }
  showSuccess(message: string) {
    this.toast.success({ detail: 'SUCCESS', summary: message });

  }

  actualizarUsuario() {
    const formData = new FormData();
    Object.keys(this.usuarioForm.controls).forEach(key => {
      if (key !== 'foto_perfil') {
        formData.append(key, this.usuarioForm.get(key)?.value);
      }
    });

    if (this.selectedFile) {
      formData.append('foto_perfil', this.selectedFile);
      console.log("Archivo foto_perfil agregado:", this.selectedFile.name);
    } else {
      console.log("No se seleccionó ningún archivo para foto_perfil.");
    }
    formData.append('id_usuario', sessionStorage.getItem('id_user') || '');
  
    if (this.usuarioForm.valid) {
      this.sessionService.actualizarDatosUsuario(formData).subscribe(
        (res: any) => {
          console.log(res);
          this.showSuccess('Datos actualizados correctamente.');
        },
        (error: any) => {
          console.log(error);
          this.showError('Error al actualizar los datos.');
        }
      );
    }
  }
  

}
