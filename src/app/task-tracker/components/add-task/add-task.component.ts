import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/task-tracker/services/task.service';
import { UiService } from 'src/app/task-tracker/services/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})

export class AddTaskComponent implements OnInit {
  addForm!: FormGroup; // Form group for add task form
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter(); // Output event emitter for adding a task
  showAddTask!: boolean; // Variable to control the visibility of the add task UI component
  subscription!: Subscription; // Subscription to UI service for toggle events

  constructor(private uiService: UiService, private taskService: TaskService) {
    // Subscribe to toggle events from UiService
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  // Lifecycle hook called after component initialization
  ngOnInit(): void {
    // Initialize addForm with form controls and validators
    this.addForm = new FormGroup({
      text: new FormControl('', Validators.required),
      day: new FormControl('', Validators.required),
      reminder: new FormControl(false),
    });
  }

  // Method called when the add task form is submitted
  onSubmit() {
    // Retrieve form control values
    const text = this.addForm.get('text')?.value;
    const day = this.addForm.get('day')?.value;
    const reminder = this.addForm.get('reminder')?.value;

    // Create a new task object
    const newTask: Task = {
      text: text,
      day: day,
      reminder: reminder,
    };

    // Emit the new task to the parent component
    this.onAddTask.emit(newTask);

    // Reset the form after submission
    this.addForm.reset({ reminder: false });
  }
}
