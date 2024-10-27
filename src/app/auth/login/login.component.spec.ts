import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create the form with 2 controls', () => {
    expect(component.formularioLogin.contains('usuario')).toBeTrue();
    expect(component.formularioLogin.contains('password')).toBeTrue();
  });
  
  it('should make the usuario control required', () => {
    const control = component.formularioLogin.get('usuario');
    control?.setValue(''); // Establece el valor como vacío
    expect(control?.valid).toBeFalse(); // Debe ser inválido porque es requerido
    expect(control?.errors?.['required']).toBeTruthy(); // Verifica que el error 'required' esté presente
  });
});
