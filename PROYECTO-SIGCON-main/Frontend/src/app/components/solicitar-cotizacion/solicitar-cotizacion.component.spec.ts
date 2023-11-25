import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarCotizacionComponent } from './solicitar-cotizacion.component';

describe('SolicitarCotizacionComponent', () => {
  let component: SolicitarCotizacionComponent;
  let fixture: ComponentFixture<SolicitarCotizacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitarCotizacionComponent]
    });
    fixture = TestBed.createComponent(SolicitarCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
