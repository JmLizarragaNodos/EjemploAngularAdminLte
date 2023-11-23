import { TestBed } from '@angular/core/testing';

import { ConfiguracionesProyectoService } from './configuraciones-proyecto.service';

describe('ConfiguracionesProyectoService', () => {
  let service: ConfiguracionesProyectoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfiguracionesProyectoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
