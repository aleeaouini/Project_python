import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { FormationService } from '../../services/formation.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  studentCount = 0;
  formationCount = 0;
  loading = false;
  error: string | null = null;

  constructor(
    private studentService: StudentService,
    private formationService: FormationService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    
    // Charger le nombre d'étudiants
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.studentCount = students.length;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des données étudiants', err);
        this.error = 'Impossible de charger les données du tableau de bord';
        this.loading = false;
      }
    });

    // Charger le nombre de formations
    this.formationService.getFormations().subscribe({
      next: (formations) => {
        this.formationCount = formations.length;
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des données formations', err);
        this.error = 'Impossible de charger les données du tableau de bord';
      }
    });
  }
}