import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAppointmentComponent } from './liste-appointment.component';

describe('ListeAppointmentComponent', () => {
  let component: ListeAppointmentComponent;
  let fixture: ComponentFixture<ListeAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeAppointmentComponent]
    });
    fixture = TestBed.createComponent(ListeAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
