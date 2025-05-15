import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Formation {
  id: number;
  name: string;
  department_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private apiUrl = 'http://localhost:8000'; // URL FastAPI

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/departments`);
  }

  addFormation(formation: Formation): Observable<Formation> {
    return this.http.post<Formation>(`${this.apiUrl}/formations`, formation);
  }

  getFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.apiUrl}/formations`);
  }
}
