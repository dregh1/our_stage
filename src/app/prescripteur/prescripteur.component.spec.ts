import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescripteurComponent } from './prescripteur.component';

describe('PrescripteurComponent', () => {
  let component: PrescripteurComponent;
  let fixture: ComponentFixture<PrescripteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescripteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrescripteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
