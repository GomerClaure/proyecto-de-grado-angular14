import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { debounceTime, of, switchMap, map, catchError, Observable } from 'rxjs';

/**
 * Validador genérico para campos únicos
 * @param service Servicio a utilizar (ej: platillosService)
 * @param methodName Nombre del método que valida (ej: 'validarNombre')
 * @param extraParams Parámetros extra que requiere la API (ej: id_restaurante)
 * @param debounce Tiempo para esperar antes de llamar (ms)
 * @param errorKey Clave del error que se devolverá si no es único
 * @returns AsyncValidatorFn
 */
export function uniqueFieldValidator(
  service: any,
  methodName: string,
  extraParams: Record<string, any> = {},
  errorKey: string = 'notUnique'
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    return of(control.value).pipe(
      switchMap((value: string): Observable<ValidationErrors | null> => {
        console.log('Validando campo único:', value, extraParams);
        return service[methodName](value, ...Object.values(extraParams)).pipe(
          map((res: { disponible: boolean }): ValidationErrors | null => {

            return res.disponible ? null : { [errorKey]: true };

          }),
          catchError(() => of(null)) // en caso de error, no tendira que bloquear el formulario :V
        );
      })
    );
  };
}
