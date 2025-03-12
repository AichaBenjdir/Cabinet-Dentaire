import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost:3000/rendezVous';  // URL de ton fichier db.json ou de ton API

  constructor(private http: HttpClient) { }

  // Récupérer tous les rendez-vous
  getRendezvous(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPatients(): Observable<any> {
    return this.http.get<any[]>('http://localhost:3000/patients');
  }

  getTraitements(): Observable<any> {
    return this.http.get<any[]>('http://localhost:3000/traitements');  // Récupère les traitements
  }

  // Ajouter un rendez-vous avec le bon format
  addRendezvous(rendezvous: any): Observable<any> {
    return this.http.post(this.apiUrl, rendezvous);
  }


  deleteRendezvous(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
  updateRendezvous(rendezvous: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${rendezvous.id}`, rendezvous);
  }
  
}
