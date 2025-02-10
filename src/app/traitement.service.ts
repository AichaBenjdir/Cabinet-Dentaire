import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TraitementService {
  private apiUrl = 'http://localhost:3000/traitements'; 

  constructor(private http: HttpClient) {}

  getTraitements(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTraitement(traitement: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, traitement); // Envoie les données au serveur
  }

  deleteTraitement(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  updateTraitement(traitement: any): Observable<any> {
    return this.http.put(`http://localhost:3000/traitements/${traitement.id}`, traitement);
  }
  
}
