import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormCompleto2 } from './form-completo2';

describe('FormCompleto2', () => {
  let component: FormCompleto2;
  let fixture: ComponentFixture<FormCompleto2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCompleto2],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCompleto2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
