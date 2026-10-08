import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormAdop } from './form-adop';

describe('FormAdop', () => {
  let component: FormAdop;
  let fixture: ComponentFixture<FormAdop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAdop],
    }).compileComponents();

    fixture = TestBed.createComponent(FormAdop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
