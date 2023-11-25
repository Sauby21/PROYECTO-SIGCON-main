import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatoSolicitudComponent } from './formato-solicitud.component';

describe('FormatoSolicitudComponent', () => {
  let component: FormatoSolicitudComponent;
  let fixture: ComponentFixture<FormatoSolicitudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormatoSolicitudComponent]
    });
    fixture = TestBed.createComponent(FormatoSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
