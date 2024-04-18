import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  // Flag to control the visibility of the add task UI component
  private showAddTask: boolean = false;

  // Subject for emitting changes in the visibility of the add task UI component
  private subject = new Subject<any>();

  constructor() {}

  // Method to toggle the visibility of the add task UI component
  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    // Emit the updated value of showAddTask
    this.subject.next(this.showAddTask);
  }

  // Method to subscribe to changes in the visibility of the add task UI component
  onToggle(): Observable<any> {
    // Expose the subject as an Observable to allow external components to subscribe to changes
    return this.subject.asObservable();
  }
}
