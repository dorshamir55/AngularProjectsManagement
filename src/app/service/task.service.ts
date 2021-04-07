import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private BASE_URL = "http://localhost:8080";
  private TASKS = "tasks";
  private PROJECTS = "projects";

  constructor(private httpClient: HttpClient, private store:Store<any>) { }

  getTasksByProjectId(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.BASE_URL}/${this.PROJECTS}/${id}/${this.TASKS}`);
  }

  getTaskById(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.BASE_URL}/${this.TASKS}/${id}`);
  }

  createTask(task: Task): Observable<Object> {
    return this.httpClient.post(`${this.BASE_URL}/${this.TASKS}`, task);
  }

  updateTask(task: Task): Observable<Object> {
    return this.httpClient.put(`${this.BASE_URL}/${this.TASKS}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.BASE_URL}/${this.TASKS}/${id}`);
  }

  updateTaskInState(obj: { action: any; payload: any; }) {
    this.store.dispatch({
      type: obj.action,
      payload: obj.payload
    })
  }
}
