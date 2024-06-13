import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpmnprocessComponent } from './bpmnprocess.component';

describe('BpmnprocessComponent', () => {
  let component: BpmnprocessComponent;
  let fixture: ComponentFixture<BpmnprocessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BpmnprocessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BpmnprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
