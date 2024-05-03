import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DetailDemande } from 'src/app/models/DetailDemande';
import { HttpHeaders } from '@angular/common/http';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root',
})
export class MenuDemandeService {
  private baseUrl = 'http://localhost:8080/cdg';

  constructor(private http: HttpClient) {}
  //maka authorization
  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token'); // Replace with your token retrieval logic

    if (token) {
      return new HttpHeaders({ Authorization: `Bearer ${token}` });
    } else {
      // Handle the case where no token is found (e.g., throw an error or redirect to login)
      throw new Error('No authorization token found');
    }
  }
  // maka ny brouillon
  getBrouillon(): Observable<DetailDemande[]> {
    const headers = this.getHeaders();
    return this.http.get<DetailDemande[]>(this.baseUrl + '/detailDemande/get', {
      headers,
    });
  }
  //exportetr donnees excel
  // exportToExcel(data: any[], fileName: string): void {
  //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   XLSX.writeFile(wb, fileName);
  // }
  exportToExcel(tableId: string, fileName: string): void {
    const table = document.getElementById(tableId);
    if (!table) {
      console.error('La table avec l\'ID spécifié n\'existe pas.');
      return;
    }

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, fileName);
  }
}
