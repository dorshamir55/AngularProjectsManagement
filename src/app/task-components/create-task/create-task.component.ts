import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/service/global.service';
import { ADD_TASK } from 'src/app/store/actions/appActions';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  task: Task = new Task();
  currentProjectId!: number;

  constructor(private taskService: TaskService,
    private globalService: GlobalService,
    public dialogRef: MatDialogRef<CreateTaskComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.globalService.getAllState().subscribe((state: any) => {
      this.currentProjectId = state.currentProjectId;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createTask() {
    console.log(this.task)
    this.task.projectId = this.currentProjectId;
    console.log(this.task)
    this.taskService.createTask(this.task).subscribe(data => {
      console.log(data);
      this.taskService.updateTaskInState({
        action: ADD_TASK,
        payload: data
      })
    },
    error => console.log(error));

    this.closeDialog();
  }
}