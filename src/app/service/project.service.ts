import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../model/project';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  
  private BASE_URL = "http://localhost:8080/projects";

  constructor(private httpClient: HttpClient, private store: Store<any>) { }
  
  getProjectsList(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${this.BASE_URL}`);
  }
  
  getProjectById(id: number): Observable<Project> {
    return this.httpClient.get<Project>(`${this.BASE_URL}/${id}`);
  }
  
  createProject(project: Project): Observable<Object> {
    return this.httpClient.post(`${this.BASE_URL}`, project);
  }
  
  updateProject(id: number, project: Project): Observable<Object> {
    return this.httpClient.put(`${this.BASE_URL}/${id}`, project);
  }
  
  deleteProject(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.BASE_URL}/${id}`);
  }
  
  updateProjectInState(obj: { action: any; payload: any; }) {
    this.store.dispatch({
      type: obj.action,
      payload: obj.payload
    })
  }
}
