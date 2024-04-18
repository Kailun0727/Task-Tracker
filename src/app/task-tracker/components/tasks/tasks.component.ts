import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task-tracker/services/task.service';
import { Task } from 'src/app/Task';
import { Subscription } from 'rxjs';

// Enum to define actions for task count change
enum ACTION {
  Increment = 'INCREMENT',
  Decrement = 'DECREMENT',
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = []; // Array to store tasks
  count: string = ''; // Variable to store task count
  subscription!: Subscription; // Subscription to count changes

  constructor(private taskService: TaskService) {
    // Subscribe to count changes from TaskService
    this.subscription = this.taskService.countChange().subscribe((value) => {
      // Update count
      this.count = value.toString();
    });
  }

  // Lifecycle hook called after component initialization
  ngOnInit(): void {
    // Fetch tasks from TaskService
    this.taskService.getTasks().subscribe((tasks) => {
      // Update tasks array
      this.tasks = tasks;

      // Increment task count for each task
      for (var i = 0; i < tasks.length; i++) {
        this.taskService.changeTaskCount(ACTION.Increment);
      }
    });
  }

  // Method to delete a task
  deleteTask(task: Task) {
    // Decrement task count
    this.taskService.changeTaskCount(ACTION.Decrement);
    // Delete task from server and update tasks array
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }

  // Method to toggle task reminder
  toggleReminder(task: Task) {
    // Toggle reminder status
    task.reminder = !task.reminder;
    // Update task reminder status on server
    this.taskService.updateTaskReminder(task).subscribe();
  }

  // Method to add a new task
  addTask(task: Task) {
    // Increment task count
    this.taskService.changeTaskCount(ACTION.Increment);
    // Assign task ID and add task to server
    task.id = this.count;
    this.taskService.addTask(task).subscribe(() => this.tasks.push(task));
  }
}
