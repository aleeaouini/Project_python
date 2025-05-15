import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { FormationAddComponent } from './components/formation-add/formation-add.component';
import { CourseAddComponent } from './components/course-add/course-add.component';

export const routes: Routes = [
  { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/students', component: StudentListComponent },
  { path: 'admin/students/add', component: StudentAddComponent },
  { path: 'formations/add', component: FormationAddComponent }, // ✅ Aucun changement ici si component est standalone
  { path: 'admin/course/add', component: CourseAddComponent }

];
