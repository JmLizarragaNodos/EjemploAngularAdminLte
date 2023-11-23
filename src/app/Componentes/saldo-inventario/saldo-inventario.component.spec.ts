import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldoInventarioComponent } from './saldo-inventario.component';

describe('SaldoInventarioComponent', () => {
  let component: SaldoInventarioComponent;
  let fixture: ComponentFixture<SaldoInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaldoInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaldoInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
