import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/service/global.service';
import { UPDATE_PROJECT } from 'src/app/store/actions/appActions';
import { Project } from '../../model/project';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {

  project: Project = new Project();
  currentProjectId!: number;

  constructor(private projectService: ProjectService,
    private globalService: GlobalService,
    public dialogRef: MatDialogRef<UpdateProjectComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.globalService.getAllState().subscribe((state: any) => {
      this.currentProjectId = state.currentProjectId;
    });

    this.projectService.getProjectById(this.currentProjectId).subscribe(data => {
      this.project = data;
    },error => console.log(error));
  }
  
  closeDialog() {
    this.dialogRef.close();
  }
  
  updateProject() {
    this.projectService.updateProject(this.currentProjectId, this.project).subscribe(data => {
      this.projectService.updateProjectInState({
        action: UPDATE_PROJECT,
        payload: data
      })
      console.log(data)
    }, (error) => {
      console.log(error)
    });

    this.closeDialog();
  }
}
