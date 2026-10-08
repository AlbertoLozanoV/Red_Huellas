import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EncabezadoF1 } from './encabezado-f1';

describe('EncabezadoF1', () => {
  let component: EncabezadoF1;
  let fixture: ComponentFixture<EncabezadoF1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncabezadoF1],
    }).compileComponents();

    fixture = TestBed.createComponent(EncabezadoF1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
