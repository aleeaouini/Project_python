import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {
  course: Course = {
    name: '',
    content: '',
    formation_id: 0
  };

  formations: any[] = [];

  constructor(
    private courseService: CourseService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8000/formations').subscribe({
      next: (data) => this.formations = data,
      error: (err) => console.error('Erreur chargement formations', err)
    });
  }

  onSubmit() {
    this.courseService.addCourse(this.course).subscribe({
      next: () => {
        alert('Cours ajouté avec succès');
        this.course = { name: '', content: '', formation_id: 0 };
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du cours', err);
        alert('Erreur lors de l\'ajout du cours');
      }
    });
  }
}
