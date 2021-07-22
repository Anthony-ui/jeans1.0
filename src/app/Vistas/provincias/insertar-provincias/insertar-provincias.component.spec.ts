import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarProvinciasComponent } from './insertar-provincias.component';

describe('InsertarProvinciasComponent', () => {
  let component: InsertarProvinciasComponent;
  let fixture: ComponentFixture<InsertarProvinciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertarProvinciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarProvinciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
