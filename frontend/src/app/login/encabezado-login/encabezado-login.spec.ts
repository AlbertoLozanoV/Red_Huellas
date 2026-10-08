import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EncabezadoLogin } from './encabezado-login';

describe('EncabezadoLogin', () => {
  let component: EncabezadoLogin;
  let fixture: ComponentFixture<EncabezadoLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncabezadoLogin],
    }).compileComponents();

    fixture = TestBed.createComponent(EncabezadoLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
