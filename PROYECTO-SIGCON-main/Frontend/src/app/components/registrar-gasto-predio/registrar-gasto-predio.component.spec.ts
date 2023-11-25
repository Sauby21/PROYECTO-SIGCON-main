import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarGastoPredioComponent } from './registrar-gasto-predio.component';

describe('RegistrarGastoPredioComponent', () => {
  let component: RegistrarGastoPredioComponent;
  let fixture: ComponentFixture<RegistrarGastoPredioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarGastoPredioComponent]
    });
    fixture = TestBed.createComponent(RegistrarGastoPredioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
