import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormationAddComponent } from './components/formation-add/formation-add.component';
import { FormsModule } from '@angular/forms'; // 👈 Pour ngModel, ngForm
import { CourseAddComponent } from './components/course-add/course-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/students', component: StudentListComponent },
  { path: 'admin/students/add', component: StudentAddComponent },
  { path: '**', redirectTo: '/admin/dashboard' },
  { path: 'formations/add', component: FormationAddComponent },
  {path: 'admin/course/add', component: CourseAddComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    StudentAddComponent,
    DashboardComponent,
    FormationAddComponent,
    CourseAddComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule, // nécessaire pour ngModel et ngForm
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }