import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFacturaCompraComponent } from './listar-factura-compra.component';

describe('ListarFacturaCompraComponent', () => {
  let component: ListarFacturaCompraComponent;
  let fixture: ComponentFixture<ListarFacturaCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarFacturaCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarFacturaCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
