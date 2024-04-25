import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from 'src/app/Task';

// Import Subject from RxJS for handling observable data
import { Subject } from 'rxjs';

// Define HTTP options for requests
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root', // Specifies that the service should be available at the root level
})
export class TaskService {
  // API URL for tasks
  private apiUrl = 'https://localhost:7103/api/v1/Task';

  // Counter for the number of tasks
  private taskCount: number = 0;

  // Subject for emitting task count changes
  private subject = new Subject<any>();

  constructor(private http: HttpClient) {}

  // Method to change the task count based on action (increment/decrement)
  changeTaskCount(action: string): void {
    switch (action) {
      case 'INCREMENT':
        this.taskCount += 1;
        // Emit the updated task count
        this.subject.next(this.taskCount);
        break;
      case 'DECREMENT':
        this.taskCount -= 1;
        // Emit the updated task count
        this.subject.next(this.taskCount);
        break;
    }
  }

  // Method to observe changes in task count
  countChange(): Observable<string> {
    return this.subject.asObservable();
  }

  // Method to fetch tasks from the API
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Method to delete a task by its ID
  deleteTask(task: Task): Observable<Task> {
    console.log('Delete id : ' + task.id);
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  // Method to update a task's reminder status
  updateTaskReminder(task: Task): Observable<Task> {
    console.log('Update id : ' + task.id);
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  // Method to add a new task
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }
}
