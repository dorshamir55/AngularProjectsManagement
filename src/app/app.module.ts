import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers/myReducer';

import { AppComponent } from './app.component';
import { ProjectListComponent } from './project-components/project-list/project-list.component';
import { UpdateProjectComponent } from './project-components/update-project/update-project.component';
import { CreateProjectComponent } from './project-components/create-project/create-project.component';
import { TaskListComponent } from './task-components/task-list/task-list.component';
import { CreateTaskComponent } from './task-components/create-task/create-task.component';
import { UpdateTaskComponent } from './task-components/update-task/update-task.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { DeleteTaskComponent } from './task-components/delete-task/delete-task.component';
import { DeleteProjectComponent } from './project-components/delete-project/delete-project.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    CreateProjectComponent,
    UpdateProjectComponent,
    TaskListComponent,
    CreateTaskComponent,
    UpdateTaskComponent,
    DeleteTaskComponent,
    DeleteProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    FormsModule,
    StoreModule.forRoot(reducers, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
