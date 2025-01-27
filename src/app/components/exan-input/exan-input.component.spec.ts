import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExanInputComponent } from './exan-input.component';

describe('ExanInputComponent', () => {
  let component: ExanInputComponent;
  let fixture: ComponentFixture<ExanInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExanInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExanInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
