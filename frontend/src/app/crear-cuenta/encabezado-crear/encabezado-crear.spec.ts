import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EncabezadoCrear } from './encabezado-crear';

describe('EncabezadoCrear', () => {
  let component: EncabezadoCrear;
  let fixture: ComponentFixture<EncabezadoCrear>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncabezadoCrear],
    }).compileComponents();

    fixture = TestBed.createComponent(EncabezadoCrear);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
