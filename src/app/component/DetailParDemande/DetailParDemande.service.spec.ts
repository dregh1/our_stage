import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TesteService } from './DetailParDemande.service';// Assurez-vous que le chemin d'importation est correct

describe('TesteService', () => {
  let service: TesteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule // Importez le module ici
      ],
      providers: [TesteService]
    });

    service = TestBed.inject(TesteService); // Injectez le service
    httpMock = TestBed.inject(HttpTestingController); // Injectez le HttpTestingController pour mocker les requêtes HTTP
  });

  afterEach(() => {
    httpMock.verify(); // Vérifiez qu'aucune requête n'a été laissée pendante
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Ajoutez ici vos autres tests qui utilisent HttpClient
});
