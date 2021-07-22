import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarRolesComponent } from './insertar-roles.component';

describe('InsertarRolesComponent', () => {
  let component: InsertarRolesComponent;
  let fixture: ComponentFixture<InsertarRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertarRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
