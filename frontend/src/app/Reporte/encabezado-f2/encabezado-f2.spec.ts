import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EncabezadoF2 } from './encabezado-f2';

describe('EncabezadoF2', () => {
  let component: EncabezadoF2;
  let fixture: ComponentFixture<EncabezadoF2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncabezadoF2],
    }).compileComponents();

    fixture = TestBed.createComponent(EncabezadoF2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
