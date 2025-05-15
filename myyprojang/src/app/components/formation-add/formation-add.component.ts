import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormationService, Formation } from '../../services/formation.service';

@Component({
  selector: 'app-formation-add',
  standalone: true, // ✅ Standalone
  imports: [CommonModule, FormsModule], // ✅ Ajouter les directives nécessaires
  templateUrl: './formation-add.component.html',
  styleUrls: ['./formation-add.component.css']
})
export class FormationAddComponent implements OnInit {
  formation: Formation = { id: 0, name: '', department_id: 0 };
  departments: any[] = [];
  formations: Formation[] = [];
  message: string = '';

  constructor(private formationService: FormationService) {}

  ngOnInit(): void {
    this.formationService.getDepartments().subscribe((data: any[]) => {
      this.departments = data;
    });
     this.loadFormations();
  }
  loadFormations(): void {
    this.formationService.getFormations().subscribe({
      next: (data: Formation[]) => {
        this.formations = data;
      },
      error: () => {
        this.message = "Erreur lors du chargement des formations.";
      }
    });
  }

  onSubmit(): void {
    this.formationService.addFormation(this.formation).subscribe({
      next: () => {
        this.message = 'Formation ajoutée avec succès !';
        this.formation = { id: 0, name: '', department_id: 0 };
      },
      error: () => {
        this.message = "Erreur lors de l'ajout de la formation.";
      }
    });
  }

  getDepartmentName(depId: number): string {
  const dep = this.departments.find(d => d.id === depId);
  return dep ? dep.name : 'Inconnu';
}

}
