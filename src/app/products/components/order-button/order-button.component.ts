import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-order-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-button.component.html',
  styleUrl: './order-button.component.css'
})
export class OrderButtonComponent {
  @Input() action!: 'asc' | 'desc';
  @Output() clickButton = new EventEmitter<'asc' | 'desc'>();

  onClick(): void {
    this.clickButton.emit(this.action);
  }
}
