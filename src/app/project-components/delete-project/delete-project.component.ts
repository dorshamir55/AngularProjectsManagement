import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/model/task';
import { GlobalService } from 'src/app/service/global.service';
import { ProjectService } from 'src/app/service/project.service';
import { DELETE_PROJECT } from 'src/app/store/actions/appActions';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit {

  tasks: Task[] = [];
  currentProjectId!: number;

  constructor(private projectService: ProjectService,
    private globalService: GlobalService,
    public dialogRef: MatDialogRef<DeleteProjectComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.globalService.getAllState().subscribe((state: any) => {
      this.tasks = state.tasks;
      this.currentProjectId = state.currentProjectId;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  deleteProject(id: number) {
    this.projectService.deleteProject(id).subscribe(data => {
      console.log(data);
      this.projectService.updateProjectInState({
        action: DELETE_PROJECT,
        payload: id
      })
    })

    this.closeDialog();
  }
}