import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImagesCarComponent } from './modal-images-car.component';

describe('ModalImagesCarComponent', () => {
  let component: ModalImagesCarComponent;
  let fixture: ComponentFixture<ModalImagesCarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalImagesCarComponent]
    });
    fixture = TestBed.createComponent(ModalImagesCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
