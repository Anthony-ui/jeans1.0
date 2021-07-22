import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarProveedoresComponent } from './insertar-proveedores.component';

describe('InsertarProveedoresComponent', () => {
  let component: InsertarProveedoresComponent;
  let fixture: ComponentFixture<InsertarProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertarProveedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
