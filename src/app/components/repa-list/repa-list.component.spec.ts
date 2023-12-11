import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepaListComponent } from './repa-list.component';

describe('RepaListComponent', () => {
  let component: RepaListComponent;
  let fixture: ComponentFixture<RepaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepaListComponent]
    });
    fixture = TestBed.createComponent(RepaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
