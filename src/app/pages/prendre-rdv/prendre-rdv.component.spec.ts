import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrendreRDVComponent } from './prendre-rdv.component';

describe('PrendreRDVComponent', () => {
  let component: PrendreRDVComponent;
  let fixture: ComponentFixture<PrendreRDVComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrendreRDVComponent]
    });
    fixture = TestBed.createComponent(PrendreRDVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
