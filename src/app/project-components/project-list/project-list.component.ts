import { Component, OnInit } from '@angular/core';
import { Project } from '../../model/project'
import { ProjectService } from 'src/app//service/project.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProjectComponent } from '../update-project/update-project.component';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { DELETE_PROJECT, GET_PROJECT_LIST, UPDATE_CURRENT_PROJECT_ID, UPDATE_TASK_LIST } from 'src/app/store/actions/appActions';
import { GlobalService } from 'src/app/service/global.service';
import { TaskService } from 'src/app/service/task.service';
import { Task } from 'src/app/model/task';
import { DeleteProjectComponent } from '../delete-project/delete-project.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [];
  tasks: Task[] = [];
  currentProjectId!: number;

  constructor(public dialog: MatDialog, private projectService: ProjectService,
    private taskService: TaskService,
    private globalService: GlobalService) { }

  ngOnInit(): void {
    this.globalService.getAllState().subscribe((state: any) => {
      this.projects = state.projects;
      this.tasks = state.tasks;
      this.currentProjectId = state.currentProjectId;
    });

    this.getProjects();
  }

  public getProjects() {
    this.projectService.getProjectsList().subscribe(data => {
      this.projectService.updateProjectInState({
        action: GET_PROJECT_LIST,
        payload: data
      })
    })
  }

  deleteProject(id: number) {
    this.projectService.deleteProject(id).subscribe(data => {
      console.log(data);
      this.tasks.forEach(task => this.taskService.deleteTask(task.id).subscribe(data => {
        console.log(data);
      }));
      this.projectService.updateProjectInState({
        action: DELETE_PROJECT,
        payload: data
      })
    })
  }

  showTasksOfProject(id: number) {
    this.globalService.updateCurrentIdInState({
      action: UPDATE_CURRENT_PROJECT_ID,
      payload: id
    });

    console.log(this.currentProjectId);
    this.getTasksOfProject(id);
  }

  getTasksOfProject(id: number) {
    this.taskService.getTasksByProjectId(id).subscribe(data => {
      this.taskService.updateTaskInState({
        action: UPDATE_TASK_LIST,
        payload: data
      })
    })
  }

  goToCreateProjectDialog() {
    this.openCreateProjectDialog();
  }

  goToUpdateProjectDialog(id: number) {
    this.globalService.updateCurrentIdInState({
      action: UPDATE_CURRENT_PROJECT_ID,
      payload: id
    });
    this.openUpdateProjectDialog();
  }

  goToDeleteProjectDialog(id: number) {
    this.globalService.updateCurrentIdInState({
      action: UPDATE_CURRENT_PROJECT_ID,
      payload: id
    });
    this.openDeleteProjectDialog();
  }

  openCreateProjectDialog(): void {
    const dialogRef = this.dialog.open(CreateProjectComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openUpdateProjectDialog(): void {
    const dialogRef = this.dialog.open(UpdateProjectComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  openDeleteProjectDialog(): void {
    const dialogRef = this.dialog.open(DeleteProjectComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
