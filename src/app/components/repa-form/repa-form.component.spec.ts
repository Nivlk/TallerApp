import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepaFormComponent } from './repa-form.component';

describe('RepaFormComponent', () => {
  let component: RepaFormComponent;
  let fixture: ComponentFixture<RepaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepaFormComponent]
    });
    fixture = TestBed.createComponent(RepaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
