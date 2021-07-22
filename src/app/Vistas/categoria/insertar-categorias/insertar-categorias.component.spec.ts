import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarCategoriasComponent } from './insertar-categorias.component';

describe('InsertarCategoriasComponent', () => {
  let component: InsertarCategoriasComponent;
  let fixture: ComponentFixture<InsertarCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertarCategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
