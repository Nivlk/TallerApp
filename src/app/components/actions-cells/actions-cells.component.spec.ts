import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsCellsComponent } from './actions-cells.component';

describe('ActionsCellsComponent', () => {
  let component: ActionsCellsComponent;
  let fixture: ComponentFixture<ActionsCellsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionsCellsComponent]
    });
    fixture = TestBed.createComponent(ActionsCellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
