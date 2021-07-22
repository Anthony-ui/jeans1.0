import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarSucursalComponent } from './insertar-sucursal.component';

describe('InsertarSucursalComponent', () => {
  let component: InsertarSucursalComponent;
  let fixture: ComponentFixture<InsertarSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertarSucursalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
