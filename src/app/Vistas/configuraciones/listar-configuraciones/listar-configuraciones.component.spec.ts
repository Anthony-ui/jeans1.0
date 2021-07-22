import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarConfiguracionesComponent } from './listar-configuraciones.component';

describe('ListarConfiguracionesComponent', () => {
  let component: ListarConfiguracionesComponent;
  let fixture: ComponentFixture<ListarConfiguracionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarConfiguracionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarConfiguracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
