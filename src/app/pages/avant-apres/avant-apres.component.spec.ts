import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvantApresComponent } from './avant-apres.component';

describe('AvantApresComponent', () => {
  let component: AvantApresComponent;
  let fixture: ComponentFixture<AvantApresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvantApresComponent]
    });
    fixture = TestBed.createComponent(AvantApresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
