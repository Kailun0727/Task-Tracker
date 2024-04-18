import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/task-tracker/services/ui.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {
  title: string = 'Task Tracker'; // Title for the header
  showAddTask!: boolean; // Variable to control the visibility of the add task UI component
  subscription!: Subscription; // Subscription to UI service for toggle events

  constructor(private uiService: UiService, private router: Router) {
    // Subscribe to toggle events from UiService
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  // Lifecycle hook called after component initialization
  ngOnInit(): void {}

  // Method to toggle the visibility of the add task UI component
  toggleAddTask() {
    this.uiService.toggleAddTask();
  }

  // Method to check if the current route matches a specified route
  hasRoute(route: string) {
    return this.router.url === route;
  }
}