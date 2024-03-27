import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationPrescriComponent } from './creation-prescri.component';

describe('CreationPrescriComponent', () => {
  let component: CreationPrescriComponent;
  let fixture: ComponentFixture<CreationPrescriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationPrescriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationPrescriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
