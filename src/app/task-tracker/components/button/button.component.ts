import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() text!: string; // Input property for button text
  @Input() color!: string; // Input property for button color
  @Output() btnClick = new EventEmitter(); // Output event emitter for button click

  // Constructor
  constructor() {}

  // Lifecycle hook called after component initialization
  ngOnInit(): void {}

  // Method called when the button is clicked
  onClick() {
    // Emit the button click event
    this.btnClick.emit();
  }
}
