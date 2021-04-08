import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../model/project';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  
  private BASE_URL = environment.baseUrl;
  private PROJECTS = "projects";

  constructor(private httpClient: HttpClient, private store: Store<any>) { }
  
  getProjectsList(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${this.BASE_URL}/${this.PROJECTS}`);
  }
  
  getProjectById(id: number): Observable<Project> {
    return this.httpClient.get<Project>(`${this.BASE_URL}/${this.PROJECTS}/${id}`);
  }
  
  createProject(project: Project): Observable<Object> {
    return this.httpClient.post(`${this.BASE_URL}/${this.PROJECTS}`, project);
  }
  
  updateProject(id: number, project: Project): Observable<Object> {
    return this.httpClient.put(`${this.BASE_URL}/${this.PROJECTS}/${id}`, project);
  }
  
  deleteProject(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.BASE_URL}/${this.PROJECTS}/${id}`);
  }
  
  updateProjectInState(obj: { action: any; payload: any; }) {
    this.store.dispatch({
      type: obj.action,
      payload: obj.payload
    })
  }
}
