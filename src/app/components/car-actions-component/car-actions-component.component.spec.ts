import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarActionsComponentComponent } from './car-actions-component.component';

describe('CarActionsComponentComponent', () => {
  let component: CarActionsComponentComponent;
  let fixture: ComponentFixture<CarActionsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarActionsComponentComponent]
    });
    fixture = TestBed.createComponent(CarActionsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
