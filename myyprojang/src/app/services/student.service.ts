import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  classe: string;
  department_id: number;
  department?: {
    id: number;
    name: string;
  };
}

export interface StudentCreate {
  name: string;
  email: string;
  password: string;
  age: number;
  classe: string;
  department_id: number; // Renamed from formation_id
}

export interface StudentResponse {
  id: number;
  name: string;
  email: string;
  age: number;
  classe: string;
  department_id: number;
  department?: {
    id: number;
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  // Fetch all students
  getStudents(): Observable<StudentResponse[]> {
    return this.http.get<StudentResponse[]>(`${this.apiUrl}/students`)
      .pipe(
        catchError(error => {
          console.error('Error fetching students:', error);
          throw error; // Optionally return a user-friendly error message or empty array
        })
      );
  }

  // Fetch a single student by ID
  getStudent(id: number): Observable<StudentResponse> {
    return this.http.get<StudentResponse>(`${this.apiUrl}/students/${id}`)

      .pipe(
        catchError(error => {
          console.error(`Error fetching student with id ${id}:`, error);
          throw error;
        })
      );
  }

  // Add a new student
  addStudent(student: StudentCreate): Observable<StudentResponse> {
    return this.http.post<StudentResponse>(`${this.apiUrl}/students`, student)
      .pipe(
        catchError(error => {
          console.error('Error adding student:', error);
          throw error;
        })
      );
  }

  // Delete a student by ID
  deleteStudent(id: number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/students/${id}`).pipe(
    catchError(error => {
      console.error(`Error deleting student with id ${id}:`, error);
      throw error;
    })
  );
}

  createStudent(student: StudentCreate): Observable<StudentResponse> {
  return this.http.post<StudentResponse>(`${this.apiUrl}/students`, student)
    .pipe(
      catchError(error => {
        console.error('Erreur lors de la création de l\'étudiant :', error);
        throw error;
      })
    );
}


}
