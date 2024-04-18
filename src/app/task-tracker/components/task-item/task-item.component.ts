import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})

export class TaskItemComponent implements OnInit {
  @Input() task!: Task; // Input property to receive task from parent component
  faTimes = faTimes; // FontAwesome close icon
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter(); // Output event emitter for task deletion
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter(); // Output event emitter for toggling task reminder

  constructor() {}

  // Lifecycle hook called after component initialization
  ngOnInit(): void {}

  // Method to emit event when a task is deleted
  onDelete(task: Task) {
    this.onDeleteTask.emit(task);
  }

  // Method to emit event when a task reminder is toggled
  onToggle(task: Task) {
    this.onToggleReminder.emit(task);
  }
}
