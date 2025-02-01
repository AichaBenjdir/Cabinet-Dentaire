import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterPatientsComponent } from './ajouter-patients.component';

describe('AjouterPatientsComponent', () => {
  let component: AjouterPatientsComponent;
  let fixture: ComponentFixture<AjouterPatientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterPatientsComponent]
    });
    fixture = TestBed.createComponent(AjouterPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
