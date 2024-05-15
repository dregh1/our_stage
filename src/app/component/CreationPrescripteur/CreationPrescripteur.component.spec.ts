import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationPrescripteurComponent } from './CreationPrescripteur.component';

describe('CreationPrescripteurComponent', () => {
  let component: CreationPrescripteurComponent;
  let fixture: ComponentFixture<CreationPrescripteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationPrescripteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationPrescripteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
