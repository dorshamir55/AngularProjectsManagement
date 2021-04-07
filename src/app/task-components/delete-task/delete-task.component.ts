import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/service/global.service';
import { TaskService } from 'src/app/service/task.service';
import { DELETE_TASK } from 'src/app/store/actions/appActions';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent implements OnInit {

  currentTaskId!: number;

  constructor(private taskService: TaskService,
    private globalService: GlobalService,
    public dialogRef: MatDialogRef<DeleteTaskComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.globalService.getAllState().subscribe((state: any) => {
      this.currentTaskId = state.currentTaskId;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(data => {
      console.log(data);
      this.taskService.updateTaskInState({
        action: DELETE_TASK,
        payload: id
      })
    })

    this.closeDialog();
  }
}
