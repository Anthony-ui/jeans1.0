import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarProductosComponent } from './insertar-productos.component';

describe('InsertarProductosComponent', () => {
  let component: InsertarProductosComponent;
  let fixture: ComponentFixture<InsertarProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertarProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
