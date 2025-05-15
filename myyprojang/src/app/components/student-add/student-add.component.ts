import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StudentService, StudentCreate } from '../../services/student.service';
import { DepartmentService, Department } from '../../services/departement.service'; // ✅ conserve seulement cette ligne




@Component({
  selector: 'app-student-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {
  studentForm: FormGroup;
  departments: Department[] = [];
  submitted = false;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private departmentService: DepartmentService,

    private router: Router
  ) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', [Validators.required, Validators.min(16), Validators.max(100)]],
      classe: ['', [Validators.required]],
      department_id: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
  this.departmentService.getDepartments().subscribe({
    next: (data) => {
      this.departments = data;
    },
    error: (err) => {
      console.error('Erreur lors du chargement des départements', err);
      this.error = 'Impossible de charger les départements';
    }
  });
}


  onSubmit(): void {
    this.submitted = true;

    if (this.studentForm.invalid) return;

    this.loading = true;

    const formValue = this.studentForm.value;

    // ✅ Conversion explicite de department_id en number
    const studentData: StudentCreate = {
      ...formValue,
      department_id: Number(formValue.department_id)
    };

    this.studentService.addStudent(studentData).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin/students']);
      },
      error: (err) => {
        console.error("Erreur lors de l'ajout de l'étudiant", err);
        this.error = "Impossible d'ajouter l'étudiant. Veuillez réessayer.";
        this.loading = false;
      }
    });
  }

  onReset(): void {
    this.submitted = false;
    this.studentForm.reset();
  }

  get f() {
    return this.studentForm.controls;
  }

  // ✅ Méthode pour afficher facilement les erreurs dans le template
  hasError(controlName: string, errorName: string): boolean {
    return this.submitted && this.f[controlName].hasError(errorName);
  }
}
