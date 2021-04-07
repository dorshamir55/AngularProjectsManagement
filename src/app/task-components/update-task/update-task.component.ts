import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/service/global.service';
import { UPDATE_TASK } from 'src/app/store/actions/appActions';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  task: Task = new Task();
  currentTaskId!: number;

  constructor(private taskService: TaskService,
    private globalService: GlobalService,
    public dialogRef: MatDialogRef<UpdateTaskComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.globalService.getAllState().subscribe((state: any) => {
      this.currentTaskId = state.currentTaskId;
    });

    this.taskService.getTaskById(this.currentTaskId).subscribe(data => {
      this.task = data;
      console.log(this.task);
    },error => console.log(error));
  }
  
  closeDialog() {
    this.dialogRef.close();
  }
  
  updateTask() {
    this.taskService.updateTask(this.task).subscribe(data => {
      this.taskService.updateTaskInState({
        action: UPDATE_TASK,
        payload: data
      })
      console.log(data)
    }, (error) => {
      console.log(error)
    });
    
    this.closeDialog();
  }
}
