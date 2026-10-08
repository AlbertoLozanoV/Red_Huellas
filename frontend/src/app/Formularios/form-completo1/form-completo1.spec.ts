import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormCompleto1 } from './form-completo1';

describe('FormCompleto1', () => {
  let component: FormCompleto1;
  let fixture: ComponentFixture<FormCompleto1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCompleto1],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCompleto1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
