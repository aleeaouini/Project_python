import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentService, Student } from '../../services/student.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  loading = false;
  error: string | null = null;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loading = true;
    this.error = null;
    
    this.studentService.getStudents().subscribe({
      next: (data: Student[]) => {
        this.students = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des étudiants', err);
        this.error = 'Impossible de charger la liste des étudiants';
        this.loading = false;
      }
    });
  }

  deleteStudent(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          // Mise à jour de la liste après suppression
          this.students = this.students.filter(student => student.id !== id);
        },
        error: (err: any) => {
          console.error('Erreur lors de la suppression', err);
          alert('Erreur lors de la suppression de l\'étudiant');
        }
      });
    }
  }
}