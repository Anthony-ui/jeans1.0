import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarConfiguracionesComponent } from './insertar-configuraciones.component';

describe('InsertarConfiguracionesComponent', () => {
  let component: InsertarConfiguracionesComponent;
  let fixture: ComponentFixture<InsertarConfiguracionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertarConfiguracionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarConfiguracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
