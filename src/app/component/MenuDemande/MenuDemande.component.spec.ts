import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDemandeComponent } from './MenuDemande.component';

describe('MenuDemandeComponent', () => {
  let component: MenuDemandeComponent;
  let fixture: ComponentFixture<MenuDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuDemandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
