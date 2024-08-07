import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  private cuentaSubject =new BehaviorSubject<any[]>([]);
  cuenta$ =this.cuentaSubject.asObservable();
  constructor() { }
}
