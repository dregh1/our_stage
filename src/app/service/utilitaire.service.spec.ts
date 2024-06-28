


import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UtilitaireService } from './utilitaire.service';


// Assurez-vous que le chemin d'importation est correct

describe('UtilitaireService', () => {
  let service: UtilitaireService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule // Importez le module ici
      ],
      providers: [UtilitaireService]
    });

    service = TestBed.inject(UtilitaireService); // Injectez le service
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
