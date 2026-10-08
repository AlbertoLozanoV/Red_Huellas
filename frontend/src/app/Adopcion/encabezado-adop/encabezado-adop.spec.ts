import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EncabezadoAdop } from './encabezado-adop';

describe('EncabezadoAdop', () => {
  let component: EncabezadoAdop;
  let fixture: ComponentFixture<EncabezadoAdop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncabezadoAdop],
    }).compileComponents();

    fixture = TestBed.createComponent(EncabezadoAdop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
