import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosTraitementsComponent } from './nos-traitements.component';

describe('NosTraitementsComponent', () => {
  let component: NosTraitementsComponent;
  let fixture: ComponentFixture<NosTraitementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NosTraitementsComponent]
    });
    fixture = TestBed.createComponent(NosTraitementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
