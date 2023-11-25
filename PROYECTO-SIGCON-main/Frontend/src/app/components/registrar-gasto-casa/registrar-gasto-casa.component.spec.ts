import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarGastoCasaComponent } from './registrar-gasto-casa.component';

describe('RegistrarGastoCasaComponent', () => {
  let component: RegistrarGastoCasaComponent;
  let fixture: ComponentFixture<RegistrarGastoCasaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarGastoCasaComponent]
    });
    fixture = TestBed.createComponent(RegistrarGastoCasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
