import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationSession1Component } from './creation-session1.component';

describe('CreationSession1Component', () => {
  let component: CreationSession1Component;
  let fixture: ComponentFixture<CreationSession1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationSession1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationSession1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
