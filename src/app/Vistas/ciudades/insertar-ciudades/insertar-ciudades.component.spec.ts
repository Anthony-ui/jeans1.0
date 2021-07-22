import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarCiudadesComponent } from './insertar-ciudades.component';

describe('InsertarCiudadesComponent', () => {
  let component: InsertarCiudadesComponent;
  let fixture: ComponentFixture<InsertarCiudadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertarCiudadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarCiudadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
