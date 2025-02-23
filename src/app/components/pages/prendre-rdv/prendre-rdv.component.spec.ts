import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrendreRdvComponent } from './prendre-rdv.component';

describe('PrendreRdvComponent', () => {
  let component: PrendreRdvComponent;
  let fixture: ComponentFixture<PrendreRdvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrendreRdvComponent]
    });
    fixture = TestBed.createComponent(PrendreRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
