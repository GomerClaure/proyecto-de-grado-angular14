import { AbstractControl, ValidationErrors } from '@angular/forms';

export function fileValidator(tiposPermitidos: string[], tamanioMaxMb: number) {
    return (control: AbstractControl): ValidationErrors | null => {
        const archivo = control.value as File;

        // Si no hay archivo seleccionado, retorna null (sin error)
        if (!archivo) {
            return null;
        }

        // Valida el tipo de archivo
        const tipoArchivoValido = tiposPermitidos.includes(archivo.type);

        // Valida el tamaño del archivo
        const fileSizeValid = archivo.size <= tamanioMaxMb * 1024 * 1024;

        // Retorna el error adecuado si no pasa la validación
        if (!tipoArchivoValido) {
            return { invalidoTipoArchivo: true };
        }

        if (!fileSizeValid) {
            return { archivoMuyPesado: true };
        }

        // Si todo está bien, retorna null (sin error)
        return null;
    };
}

