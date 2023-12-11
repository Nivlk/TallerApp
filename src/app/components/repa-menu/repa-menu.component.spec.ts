import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepaMenuComponent } from './repa-menu.component';

describe('RepaMenuComponent', () => {
  let component: RepaMenuComponent;
  let fixture: ComponentFixture<RepaMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepaMenuComponent]
    });
    fixture = TestBed.createComponent(RepaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
