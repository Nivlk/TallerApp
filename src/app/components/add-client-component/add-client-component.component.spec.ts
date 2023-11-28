import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientComponentComponent } from './add-client-component.component';

describe('AddClientComponentComponent', () => {
  let component: AddClientComponentComponent;
  let fixture: ComponentFixture<AddClientComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddClientComponentComponent]
    });
    fixture = TestBed.createComponent(AddClientComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
