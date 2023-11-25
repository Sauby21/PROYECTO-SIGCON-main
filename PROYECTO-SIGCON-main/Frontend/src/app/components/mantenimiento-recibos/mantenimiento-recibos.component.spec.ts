import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoRecibosComponent } from './mantenimiento-recibos.component';

describe('MantenimientoRecibosComponent', () => {
  let component: MantenimientoRecibosComponent;
  let fixture: ComponentFixture<MantenimientoRecibosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantenimientoRecibosComponent]
    });
    fixture = TestBed.createComponent(MantenimientoRecibosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
