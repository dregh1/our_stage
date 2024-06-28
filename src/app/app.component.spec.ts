import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
       ReactiveFormsModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ComitedeDepense'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ComitedeDepense');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('ComitedeDepense app is running!');
  // });
  // async function detectChanges(fixture: ComponentFixture<AppComponent>) {
  //   fixture.detectChanges(); // Détecte les changements après toute modification des données
  
  //   // Si vous avez des opérations asynchrones spécifiques à attendre, assurez-vous de les démarrer ici
  //   // Par exemple, si vous avez un appel HTTP dans votre composant, vous devriez démarrer cet appel ici
  
  //   await fixture.whenStable(); // Attendre que toutes les opérations asynchrones soient terminées
  
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('ComitedeDepense app is running!');
  // }
  
  
});
