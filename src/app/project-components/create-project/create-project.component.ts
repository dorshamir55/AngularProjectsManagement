import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../../model/project';
import { ProjectService } from 'src/app/service/project.service';
import { ADD_PROJECT} from '../../store/actions/appActions';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  project: Project = new Project();

  constructor(private projectService: ProjectService,
    public dialogRef: MatDialogRef<CreateProjectComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createProject() {
    this.projectService.createProject(this.project).subscribe(data => {
      this.projectService.updateProjectInState({
        action: ADD_PROJECT,
        payload: data
      })
    },
    error => console.log(error));

    this.closeDialog();
  }
}
