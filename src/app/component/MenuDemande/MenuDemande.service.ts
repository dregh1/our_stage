import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DetailDemande } from 'src/app/models/DetailDemande';
import { HttpHeaders } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { Brouillon } from 'src/app/models/Brouillon';
import { IfStmt } from '@angular/compiler';
import { Demande } from 'src/app/models/Demande';
import { Titre } from 'src/app/models/TitreDepense';
import { MyMail } from 'src/app/models/MyMail';
import { SuperAdminService } from '../super-admin/super-admin.service';
@Injectable({
  providedIn: 'root',
})
export class MenuDemandeService {
  private baseUrl = 'http://localhost:8080/prescripteur';
  private baseUrl2 = 'http://localhost:8080/teste';
  constructor(private http: HttpClient ,  private supAdm : SuperAdminService) {}
  
  
  //maka authorization
  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');  // Replace with your token retrieval logic
  
    if (token) {
      return new HttpHeaders({ Authorization: `Bearer ${token}` });
    } else {
      // Handle the case where no token is found (e.g., throw an error or redirect to login)
      throw new Error('No authorization token found');
    }
  }
  
  // // maka ny brouillon
  // getBrouillon(): Observable<DetailDemande[]> {
  //   const headers = this.getHeaders();
  //   return this.http.get<DetailDemande[]>(this.baseUrl + '/detailDemande/get', {
  //     headers,
  //   });
  // }
  //exportetr donnees excel
  // exportToExcel(data: any[], fileName: string): void {
  //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   XLSX.writeFile(wb, fileName);
  // }
  //exportetr donnees excel 
  exportToExcel(data: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, fileName);
  }
  searchbrouillon(idDirection : string | '' , idsession :string | ''): Observable<Brouillon[]>{
    const headers = this.getHeaders();
    const queryParams = new URLSearchParams();
    queryParams.append('idDirection', idDirection ? encodeURIComponent(idDirection) : ''); // Handle empty strings and special characters
    queryParams.append('idSession', idsession ? encodeURIComponent(idsession) : '');
    
    const url = `${this.baseUrl}/brouillon/s?${queryParams.toString()}`; // Build URL with encoded params

    return this.http.get<Brouillon[]>(url, { headers });
  //  return this.http.get<DetailDemande[]>(this.baseUrl+`/search?idDirection=${idDirection}&statut=${statut}&motif=${motif}&dateDebut=${datedebut}&dateFin=${datefin}&session=${session}&idFournisseur=${idfournisseur}`,{headers});
  }
  search(idDirection : string | '' , idsession :string | ''): Observable<DetailDemande[]>{
    const headers = this.getHeaders();
    const queryParams = new URLSearchParams();

    // if(idDirection !== '')
    queryParams.append('idDirection', idDirection ? encodeURIComponent(idDirection) : ''); // Handle empty strings and special characters
    
    // if(idsession !== '')
    queryParams.append('idSession', idsession ? encodeURIComponent(idsession) : '');
    
    const url = `${this.baseUrl2}/active/s?${queryParams.toString()}`; // Build URL with encoded params

    return this.http.get<DetailDemande[]>(url, { headers });
  //  return this.http.get<DetailDemande[]>(this.baseUrl+`/search?idDirection=${idDirection}&statut=${statut}&motif=${motif}&dateDebut=${datedebut}&dateFin=${datefin}&session=${session}&idFournisseur=${idfournisseur}`,{headers});
  }
  getAttenteSession(idDirection : string | ''): Observable<DetailDemande[]>{
    const headers = this.getHeaders();
    const queryParams = new URLSearchParams();

    // if(idDirection !== '')
    queryParams.append('idDirection', idDirection ? encodeURIComponent(idDirection) : ''); // Handle empty strings and special characters
    
    
    const url = `${this.baseUrl}/attenteSession/s?${queryParams.toString()}`; // Build URL with encoded params

    return this.http.get<DetailDemande[]>(url, { headers });
  //  return this.http.get<DetailDemande[]>(this.baseUrl+`/search?idDirection=${idDirection}&statut=${statut}&motif=${motif}&dateDebut=${datedebut}&dateFin=${datefin}&session=${session}&idFournisseur=${idfournisseur}`,{headers});
  }
   //maka demande
   getAttteneSessionById(id: number): Observable<Demande> {
    const headers = this.getHeaders();
    return this.http.get<Demande>(`${this.baseUrl}/attenteSession/${id}`, {
      headers,
    });
  }
    //supprimer demande
    supprimerDemande(id: number) :Observable<any> {
      const headers = this.getHeaders();
      return this.http.delete<any>(`${this.baseUrl2}/supprimerDemande/${id}`, { headers, });
    }
  // maka titre by id
  gettitreById(id: number): Observable<Titre> {
    const headers = this.getHeaders();
    return this.http.get<Titre>(
      `${this.baseUrl}/titre/${id}`,
      { headers }
    );
  }

   //modication titredepense
   updatetitredepense(id: number, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.baseUrl}/titre/${id}`, data, {
      headers,
    });
  }
  //modication demande
  update(id: number, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.baseUrl}/demande/${id}`, data, {
      headers,
    });
  }
 
  //soumettre demande maika
  soumettreDemande(id : string) : Observable<any>
  {
    const headers = this.getHeaders();
    // console.log("#######################àààà############################");
    // console.log(headers);
    return this.http.post<any>(`${this.baseUrl2}/soumettre/${id}`, {}, { headers }); 
    
    // return this.http.post<any>(this.baseUrl2+'/soumettre/'+id, {headers});
  }


  notifSoumission() {
    const headers = this.getHeaders();

    let emails : MyMail;
    this.supAdm.getEmailSoumission()
    .then((emails: MyMail[]) => {   
      console.log("yessssssssssssssssssssssssssssssssssss");
      console.log(emails);
      return this.http.post<any>(this.baseUrl + '/demandeSoumise', emails, { headers, })
      .subscribe(
        (response)=>{},

        (error)=>{console.error(error);
        ;}
        
        );

    });
  }

  // async getEmailSoumission(): Promise<MyMail[]> {
  
  //   const urlAchat = "http://localhost:8083/admin/realms/oma/roles/ACH/users";
  //   const urlCdg = "http://localhost:8083/admin/realms/oma/roles/CDG/users";
  
  //   const headers = this.getHeadersAdmin();
  //   try {
  //     const httpResponse = await this.http.get<any>(urlAchat, { headers }).toPromise();
  //     const httpResponseCdg = await this.http.get<any>(urlCdg, { headers }).toPromise();
      
  //     if (!httpResponse  ) {
  //       // console.error('Aucune réponse valide reçue', httpResponse);
  //       throw new Error('Aucune réponse valide reçue pour la liste ACH');
  //     }

  //     if (!httpResponseCdg  ) {
  //       // console.error('Aucune réponse valide reçue', httpResponseCdg);
  //       throw new Error('Aucune réponse valide reçue pour la liste CDG');
  //     }

  //     const responseAch = httpResponse; // Assurez-vous que la réponse contient les données attendues
  //     const responseCdg = httpResponseCdg; // Assurez-vous que la réponse contient les données attendues

  //     const mails: MyMail[] = [];
  //     for (let i = 0; i < responseAch.length; i++) {
  //       if (responseAch[i].hasOwnProperty('email') && responseAch[i].hasOwnProperty('username')) {
  //         const oneMail = new MyMail(responseAch[i].username, responseAch[i].email);
  //         mails.push(oneMail);
  //       }
  //     }

  //     for (let i = 0; i < responseCdg.length; i++) {
  //       if (responseCdg[i].hasOwnProperty('email') && responseCdg[i].hasOwnProperty('username')) {
  //         const oneMail = new MyMail( responseCdg[i].username,responseCdg[i].email);
  //         // const oneMail = new MyMail();
  //         // oneMail.email = responseCdg[i].email;
  //         // oneMail.username = responseCdg[i].username;
  //         mails.push(oneMail);
  //       }
  //     }


  //     console.log('_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_');
      
  //     console.log(mails); // Pour le débogage
  //     return mails; // Retourne le tableau de MyMail
  //   } catch (error) {
  //     console.error(error);
  //     throw error; // Propage l'erreur si nécessaire
  //   }
  // }
 

  
  // notifSoumission() {
  //   const headers = this.getHeaders();

  //   let emails : MyMail;
  //   this.supAdm.getEmailSoumission()
  //   .then((emails: MyMail[]) => {   
  //     console.log("yessssssssssssssssssssssssssssssssssss");
  //     console.log(emails);
  //     return this.http.post<any>(this.baseUrl + '/demandeSoumise', emails, { headers, })
  //     .subscribe(
  //       (response)=>{},

  //       (error)=>{console.error(error);
  //       ;}
        
  //       );

  //   });
  // }

}
