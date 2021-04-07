import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/service/global.service';
import { TaskService } from 'src/app/service/task.service';
import { UPDATE_CURRENT_TASK_ID, UPDATE_TASK } from 'src/app/store/actions/appActions';
import { Task } from 'src/app/model/task';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTaskComponent } from 'src/app/task-components/update-task/update-task.component';
import { DeleteTaskComponent } from 'src/app/task-components/delete-task/delete-task.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  currentProjectId!: number;
  currentTaskId!: number;

  constructor(public dialog: MatDialog,
    private taskService: TaskService,
    private globalService: GlobalService) { }

  ngOnInit(): void {
    this.globalService.getAllState().subscribe((state: any) => {
      this.tasks = state.tasks
      this.currentProjectId = state.currentProjectId;
      this.currentTaskId = state.currentTasktId;
    });
  }
  
  toggleCheckTask(task: Task) {
    const taskAfterToggleCheck: Task = new Task();
    taskAfterToggleCheck.id = task.id;
    taskAfterToggleCheck.projectId = task.projectId;
    taskAfterToggleCheck.content = task.content;
    taskAfterToggleCheck.checked = !task.checked;

    this.taskService.updateTask(taskAfterToggleCheck).subscribe(data => {
      this.taskService.updateTaskInState({
        action: UPDATE_TASK,
        payload: data
      })
      console.log(data)
    }, (error) => {
      console.log(error)
    });
  }

  goToUpdateTaskDialog(id: number) {
    this.globalService.updateCurrentIdInState({
      action: UPDATE_CURRENT_TASK_ID,
      payload: id
    });
    this.openUpdateTaskDialog();
  }

  goToCreateTaskDialog() {
    this.openCreateProjectDialog();
  }

  goToDeleteTaskDialog(id: number) {
    this.globalService.updateCurrentIdInState({
      action: UPDATE_CURRENT_TASK_ID,
      payload: id
    });
    this.openDeleteTaskDialog();
  }
    
  
  openCreateProjectDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openUpdateTaskDialog(): void {
    const dialogRef = this.dialog.open(UpdateTaskComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDeleteTaskDialog(): void {
    const dialogRef = this.dialog.open(DeleteTaskComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
