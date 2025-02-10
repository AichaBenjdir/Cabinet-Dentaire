import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000'; // Assurez-vous que db.json tourne via json-server

  constructor(private http: HttpClient) {}

  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/patients`);
  }

  getRendezvous(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rendezVous`);
  }

  getTraitements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/traitements`);
  }
}
