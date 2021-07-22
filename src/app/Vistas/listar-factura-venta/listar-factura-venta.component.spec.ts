import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFacturaVentaComponent } from './listar-factura-venta.component';

describe('ListarFacturaVentaComponent', () => {
  let component: ListarFacturaVentaComponent;
  let fixture: ComponentFixture<ListarFacturaVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarFacturaVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarFacturaVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
