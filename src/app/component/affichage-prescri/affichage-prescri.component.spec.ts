import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichagePrescriComponent } from './affichage-prescri.component';

describe('AffichagePrescriComponent', () => {
  let component: AffichagePrescriComponent;
  let fixture: ComponentFixture<AffichagePrescriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichagePrescriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffichagePrescriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
