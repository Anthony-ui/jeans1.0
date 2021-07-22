import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarClientesComponent } from './insertar-clientes.component';

describe('InsertarClientesComponent', () => {
  let component: InsertarClientesComponent;
  let fixture: ComponentFixture<InsertarClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertarClientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
