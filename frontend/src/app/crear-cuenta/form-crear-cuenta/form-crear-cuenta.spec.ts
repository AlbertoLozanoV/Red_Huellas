import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormCrearCuenta } from './form-crear-cuenta';

describe('FormCrearCuenta', () => {
  let component: FormCrearCuenta;
  let fixture: ComponentFixture<FormCrearCuenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCrearCuenta],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCrearCuenta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
