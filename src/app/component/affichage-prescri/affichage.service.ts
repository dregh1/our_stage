import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Demande } from 'src/app/models/Demande';
import { HttpClient } from '@angular/common/http';
import { Periode } from 'src/app/models/Periode';
import { Rubrique } from 'src/app/models/Rubrique';
import { Fournisseur } from 'src/app/models/Fournisseur';
import { Sousrubrique } from 'src/app/models/Sousrubrique';
import { Brouillon } from 'src/app/models/Brouillon';
import { Active_dmd } from 'src/app/models/Active_dmd';
@Injectable({
  providedIn: 'root'
})
export class AffichageService {
  private url = 'http://localhost:8080';

  private baseUrl = 'http://localhost:8080/teste';
  private baseUrl2 = 'http://localhost:8080/prescripteur';
  constructor(private http: HttpClient) { }
    
  //maka periode
 
  //aiche par detail
    //  getDemandeById(DemandeId:number):Observable<Demande>{
    //   return this.http.get<Demande>(this.baseUrl2+'/achat/commentaire/create'+ DemandeId);
    //  }

     getPeriode(DemandeId:number): Observable<Periode[]> {
      return this.http.get<Periode[]>(this.baseUrl+'/periode/get'+ DemandeId);
    }
    
  // maka rubrique
  //   getRubrique(rubriqueId): Observable<Rubrique[]> {
  //     return this.http.get<Rubrique[]>(this.baseUrl+'/rubrique/get'+rubriqueId);
  //   }
  // // maka periode
  //   getFournisseur(fournisseuresId): Observable<Fournisseur[]> {
  //   return this.http.get<Fournisseur[]>(this.baseUrl+'/fournisseur/get'+fournisseuresId);
  // }
  
  // maka periode
  getSousrubrique(): Observable<Sousrubrique[]> {
    return this.http.get<Sousrubrique[]>(this.baseUrl+'/sousrubrique/get');
  }
  
   // maka ny brouillon
    getDevise():  Observable<FormData[]> {
     return this.http.get<FormData[]>(this.baseUrl2+'/devise/get'); 
    }
  
    // maka ny reference
    getReference():  Observable<FormData[]> {
      return this.http.get<FormData[]>(this.baseUrl2+'/reference/get'); 
     }
     getItemById(id: number): Observable<Demande> {
      const url = `<span class="math-inline">\{this\.baseUrl\}/</span>{id}`;
      return this.http.get<Demande>(url);
    }
}
