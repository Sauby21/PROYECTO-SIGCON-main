import { TestBed } from '@angular/core/testing';

import { NombreUsuarioService } from './nombre-usuario.service';

describe('NombreUsuarioService', () => {
  let service: NombreUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NombreUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
