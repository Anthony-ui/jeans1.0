import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProvinciasComponent } from './listar-provincias.component';

describe('ListarProvinciasComponent', () => {
  let component: ListarProvinciasComponent;
  let fixture: ComponentFixture<ListarProvinciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarProvinciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProvinciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
